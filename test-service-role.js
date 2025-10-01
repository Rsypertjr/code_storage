#!/usr/bin/env node

/**
 * Test service role key specifically
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔐 Testing service role key...')
console.log('URL:', supabaseUrl)
console.log('Service Key:', serviceRoleKey ? `${serviceRoleKey.substring(0, 20)}...` : 'Missing')

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testServiceRole() {
  try {
    // Test write access (service role should be able to insert)
    const testData = {
      name: 'Test State',
      slug: 'test-state-' + Date.now(),
      abbreviation: 'TS',
      electoral_votes: 1
    }
    
    const { data, error } = await supabase
      .from('states')
      .insert(testData)
      .select()
    
    if (error) {
      console.log('❌ Service role test failed:', error.message)
      return false
    }
    
    console.log('✅ Service role can write data!')
    
    // Clean up the test data
    await supabase
      .from('states')
      .delete()
      .eq('slug', testData.slug)
    
    console.log('✅ Test data cleaned up')
    return true
    
  } catch (error) {
    console.log('❌ Service role error:', error.message)
    return false
  }
}

testServiceRole().then(success => {
  if (success) {
    console.log('')
    console.log('🎉 Service role key is working!')
    console.log('Migration should work now.')
  } else {
    console.log('')
    console.log('💡 Service role key issue detected.')
    console.log('Please check your Supabase project settings.')
  }
})