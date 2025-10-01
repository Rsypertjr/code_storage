#!/usr/bin/env node

/**
 * Simple test script to verify Supabase setup
 * Run with: node test-supabase-connection.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔧 Testing Supabase Connection...')
console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('Service Key:', serviceRoleKey ? '✅ Set' : '❌ Missing')

if (!supabaseUrl || !serviceRoleKey) {
  console.log('')
  console.log('❌ Missing environment variables!')
  console.log('Please set up your .env.local file with:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_project_url')
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_key')
  console.log('')
  console.log('Get these from your Supabase project dashboard > Settings > API')
  process.exit(1)
}

async function testConnection() {
  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey)
    
    // Test basic connection
    const { data, error } = await supabase
      .from('states')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('❌ Connection failed:', error.message)
      console.log('')
      console.log('Make sure you:')
      console.log('1. Created the Supabase project')
      console.log('2. Ran the schema SQL script')
      console.log('3. Have the correct URL and keys')
      return false
    }
    
    console.log('✅ Connection successful!')
    
    // Test states table
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('name')
      .limit(5)
    
    if (statesError) {
      console.log('❌ States table error:', statesError.message)
      return false
    }
    
    console.log(`✅ Found ${states.length} states in database`)
    if (states.length > 0) {
      console.log('Sample states:', states.map(s => s.name).join(', '))
    }
    
    return true
    
  } catch (error) {
    console.log('❌ Unexpected error:', error.message)
    return false
  }
}

testConnection().then(success => {
  if (success) {
    console.log('')
    console.log('🎉 Supabase is ready!')
    console.log('Next steps:')
    console.log('1. Run: node migrate-to-supabase.js')
    console.log('2. Start the dev server: npm run dev')
  } else {
    console.log('')
    console.log('💡 Setup needed. Check the Supabase setup guide.')
  }
})