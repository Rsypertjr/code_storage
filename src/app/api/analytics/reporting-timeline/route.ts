import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { VoteReportingTimeline } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '24' // Default to 24 hours

    const { data, error } = await supabase
      .from('vote_reporting_timeline')
      .select('*')
      .order('hour_bucket', { ascending: true })
      .limit(parseInt(limit))

    if (error) {
      console.error('Error fetching vote reporting timeline:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vote reporting timeline' },
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