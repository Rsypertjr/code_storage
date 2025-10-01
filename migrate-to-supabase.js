#!/usr/bin/env node

/**
 * Migration script to transfer data from JSON files to Supabase
 * Run with: node migrate-to-supabase.js
 */

const fs = require('fs').promises
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Import Supabase (using require for Node.js compatibility)
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !anonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, anonKey)

// Data directory path
const dataDir = path.join(__dirname, 'db')

async function getStateIdBySlug(slug) {
  const { data, error } = await supabase
    .from('states')
    .select('id')
    .eq('slug', slug)
    .single()
  
  if (error) {
    throw new Error(`Failed to find state with slug ${slug}: ${error.message}`)
  }
  
  return data.id
}

async function migrateStateData(fileName) {
  try {
    const filePath = path.join(dataDir, fileName)
    const rawData = await fs.readFile(filePath, 'utf8')
    const stateData = JSON.parse(rawData)
    
    // Extract state name from filename (e.g., "new-york-timeseries-2025-09-30.json" -> "new-york")
    const parts = fileName.replace('.json', '').split('-')
    const timeseriesIndex = parts.indexOf('timeseries')
    const stateSlug = parts.slice(0, timeseriesIndex).join('-')
    const stateId = await getStateIdBySlug(stateSlug)
    
    console.log(`  🏛️  State: ${stateData.state} (ID: ${stateId})`)
    
    // 1. Insert state metadata (simplified schema)
    const lastEntry = stateData.data[stateData.data.length - 1]
    const metadataRecord = {
      state_id: stateId,
      population: null, // Will be updated later if needed
      registered_voters: null,
      winner_2020: lastEntry.biden_votes > lastEntry.trump_votes ? 'Biden' : 'Trump',
      margin_2020: Math.abs(lastEntry.biden_percentage - lastEntry.trump_percentage),
      swing_state: Math.abs(lastEntry.biden_percentage - lastEntry.trump_percentage) < 5.0
    }

    const { error: metadataError } = await supabase
      .from('state_metadata')
      .upsert(metadataRecord, { 
        onConflict: 'state_id',
        ignoreDuplicates: false 
      })
    
    if (metadataError) {
      throw new Error(`Failed to insert metadata: ${metadataError.message}`)
    }
    
    console.log(`  ✅ Metadata inserted`)
    
    // 2. Insert timeseries data in batches (simplified schema)
    const batchSize = 100
    const timeseriesRecords = stateData.data.map(entry => ({
      state_id: stateId,
      timestamp: entry.timestamp,
      biden_votes: entry.biden_votes,
      trump_votes: entry.trump_votes,
      total_votes: entry.votes
    }))
    
    console.log(`  📊 Inserting ${timeseriesRecords.length} timeseries records...`)
    
    // Delete existing timeseries data for this state first
    const { error: deleteError } = await supabase
      .from('timeseries_data')
      .delete()
      .eq('state_id', stateId)
    
    if (deleteError) {
      console.warn(`  ⚠️  Could not delete existing data: ${deleteError.message}`)
    }
    
    // Insert in batches
    for (let i = 0; i < timeseriesRecords.length; i += batchSize) {
      const batch = timeseriesRecords.slice(i, i + batchSize)
      
      const { error: batchError } = await supabase
        .from('timeseries_data')
        .insert(batch)
      
      if (batchError) {
        throw new Error(`Failed to insert timeseries batch ${i}-${i + batch.length}: ${batchError.message}`)
      }
      
      console.log(`    ✅ Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(timeseriesRecords.length/batchSize)} inserted`)
    }
    
    console.log(`  🎉 Successfully migrated ${stateData.state}`)
    return {
      state: stateData.state,
      metadataRecords: 1,
      timeseriesRecords: timeseriesRecords.length,
      success: true
    }
    
  } catch (error) {
    console.error(`  ❌ Error migrating ${fileName}: ${error.message}`)
    return {
      state: fileName,
      error: error.message,
      success: false
    }
  }
}

async function main() {
  console.log('🚀 Starting Supabase migration...')
  console.log('')
  
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('states').select('count').limit(1)
    if (error) {
      throw new Error(`Supabase connection failed: ${error.message}`)
    }
    console.log('✅ Supabase connection successful')
    console.log('')
    
    // Get all JSON files
    const dbPath = path.join(__dirname, 'db')
    const files = await fs.readdir(dbPath)
    const jsonFiles = files.filter(file => 
      file.endsWith('-timeseries-2025-09-30.json') && 
      !file.startsWith('election-timeseries')
    )
    
    console.log(`📁 Found ${jsonFiles.length} state files to migrate`)
    console.log('')
    
    // Migrate each file
    const results = []
    for (const file of jsonFiles) {
      const result = await migrateStateData(file)
      results.push(result)
      console.log('')
    }
    
    // Summary
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)
    
    console.log('📊 Migration Summary:')
    console.log(`  ✅ Successful: ${successful.length}`)
    console.log(`  ❌ Failed: ${failed.length}`)
    console.log(`  📈 Total metadata records: ${successful.reduce((sum, r) => sum + (r.metadataRecords || 0), 0)}`)
    console.log(`  📈 Total timeseries records: ${successful.reduce((sum, r) => sum + (r.timeseriesRecords || 0), 0)}`)
    
    if (failed.length > 0) {
      console.log('')
      console.log('❌ Failed migrations:')
      failed.forEach(f => console.log(`  - ${f.state}: ${f.error}`))
    }
    
    console.log('')
    console.log('🎉 Migration complete!')
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}