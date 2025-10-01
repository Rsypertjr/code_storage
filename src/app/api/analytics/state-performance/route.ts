import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { StatePerformanceMetrics } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sort_by') || 'name'
    const order = searchParams.get('order') === 'desc' ? false : true

    let query = supabase
      .from('state_performance_metrics')
      .select('*')

    // Apply sorting
    switch (sortBy) {
      case 'total_updates':
      case 'final_vote_count':
      case 'largest_vote_dump':
        query = query.order(sortBy, { ascending: order })
        break
      default:
        query = query.order('name', { ascending: true })
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching state performance metrics:', error)
      return NextResponse.json(
        { error: 'Failed to fetch state performance metrics' },
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