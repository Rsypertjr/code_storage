import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface LeadChangeParams {
  state?: string
  limit?: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateSlug = searchParams.get('state')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = supabase
      .from('lead_changes')
      .select('*')
      .eq('lead_changed', true)
      .order('timestamp_recorded', { ascending: true })

    if (stateSlug) {
      query = query.eq('slug', stateSlug)
    }

    if (limit > 0) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching lead changes:', error)
      return NextResponse.json(
        { error: 'Failed to fetch lead changes' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}