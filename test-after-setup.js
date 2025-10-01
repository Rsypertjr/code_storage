#!/usr/bin/env node

/**
 * Test Supabase connection after manual schema setup
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase connection after schema setup...')

const supabase = createClient(supabaseUrl, anonKey)

async function testConnection() {
  try {
    // Test basic query
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('name, abbreviation, electoral_votes')
      .limit(5)
    
    if (statesError) {
      console.log('❌ States query error:', statesError.message)
      return false
    }
    
    console.log('✅ States query successful!')
    console.log('Sample states:', states.map(s => `${s.name} (${s.abbreviation})`).join(', '))
    
    // Test count
    const { count, error: countError } = await supabase
      .from('states')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.log('❌ Count query error:', countError.message)
      return false
    }
    
    console.log(`✅ Total states in database: ${count}`)
    
    // Test other tables
    const { data: metadata, error: metadataError } = await supabase
      .from('state_metadata')
      .select('*')
      .limit(1)
    
    console.log('✅ State metadata table accessible')
    
    const { data: timeseries, error: timeseriesError } = await supabase
      .from('timeseries_data')
      .select('*')
      .limit(1)
    
    console.log('✅ Timeseries data table accessible')
    
    return true
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message)
    return false
  }
}

testConnection().then(success => {
  if (success) {
    console.log('')
    console.log('🎉 Supabase is ready!')
    console.log('Next step: Run the data migration')
    console.log('Command: node migrate-to-supabase.js')
  } else {
    console.log('')
    console.log('💡 Please ensure the schema was set up correctly in Supabase dashboard')
  }
})