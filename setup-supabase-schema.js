#!/usr/bin/env node

/**
 * Schema setup script for Supabase
 * Run with: node setup-supabase-schema.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔧 Setting up Supabase Schema...')

if (!supabaseUrl || !serviceRoleKey) {
  console.log('❌ Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupSchema() {
  try {
    console.log('1️⃣ Creating states table...')
    
    // Create states table
    const { error: statesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS states (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) UNIQUE NOT NULL,
          slug VARCHAR(50) UNIQUE NOT NULL,
          abbreviation VARCHAR(2) UNIQUE NOT NULL,
          electoral_votes INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (statesError) {
      console.log('❌ Error creating states table:', statesError.message)
      return false
    }
    
    console.log('✅ States table created')
    
    // Insert states data
    console.log('2️⃣ Inserting states data...')
    const statesData = [
      { name: 'Alabama', slug: 'alabama', abbreviation: 'AL', electoral_votes: 9 },
      { name: 'Alaska', slug: 'alaska', abbreviation: 'AK', electoral_votes: 3 },
      { name: 'Arizona', slug: 'arizona', abbreviation: 'AZ', electoral_votes: 11 },
      { name: 'Arkansas', slug: 'arkansas', abbreviation: 'AR', electoral_votes: 6 },
      { name: 'California', slug: 'california', abbreviation: 'CA', electoral_votes: 54 },
      { name: 'Colorado', slug: 'colorado', abbreviation: 'CO', electoral_votes: 10 },
      { name: 'Connecticut', slug: 'connecticut', abbreviation: 'CT', electoral_votes: 7 },
      { name: 'Delaware', slug: 'delaware', abbreviation: 'DE', electoral_votes: 3 },
      { name: 'District of Columbia', slug: 'district-of-columbia', abbreviation: 'DC', electoral_votes: 3 },
      { name: 'Florida', slug: 'florida', abbreviation: 'FL', electoral_votes: 30 }
    ]
    
    const { error: insertError } = await supabase
      .from('states')
      .upsert(statesData, { onConflict: 'slug' })
    
    if (insertError) {
      console.log('❌ Error inserting states:', insertError.message)
      return false
    }
    
    console.log('✅ States data inserted')
    
    // Test query
    console.log('3️⃣ Testing query...')
    const { data, error } = await supabase
      .from('states')
      .select('name')
      .limit(5)
      
    if (error) {
      console.log('❌ Query error:', error.message)
      return false
    }
    
    console.log('✅ Query successful! Found states:', data.map(s => s.name).join(', '))
    return true
    
  } catch (error) {
    console.log('❌ Setup error:', error.message)
    return false
  }
}

setupSchema().then(success => {
  if (success) {
    console.log('')
    console.log('🎉 Basic setup complete!')
    console.log('Next: Run the full schema in your Supabase dashboard')
    console.log('Go to: https://supabase.com/dashboard > SQL Editor')
    console.log('Copy/paste the supabase-schema.sql file content')
  } else {
    console.log('')
    console.log('💡 Manual setup required:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Open SQL Editor')
    console.log('3. Run the supabase-schema.sql content')
  }
})