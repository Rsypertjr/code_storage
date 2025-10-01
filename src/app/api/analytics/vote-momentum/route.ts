import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateSlug = searchParams.get('state')
    const hoursBack = parseInt(searchParams.get('hours_back') || '2')

    if (!stateSlug) {
      return NextResponse.json(
        { error: 'State parameter is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.rpc('get_vote_momentum', {
      state_slug: stateSlug,
      hours_back: hoursBack
    })

    if (error) {
      console.error('Error fetching vote momentum:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vote momentum' },
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