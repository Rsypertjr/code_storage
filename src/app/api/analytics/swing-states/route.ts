import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { SwingState } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const maxMargin = searchParams.get('max_margin') || '5.0'

    // Get swing states from the simplified schema
    const { data, error } = await supabase
      .from('state_metadata')
      .select(`
        winner_2020,
        margin_2020,
        swing_state,
        states!inner(
          name,
          slug,
          abbreviation,
          electoral_votes
        )
      `)
      .eq('swing_state', true)
      .lte('margin_2020', parseFloat(maxMargin))
      .order('margin_2020', { ascending: true })

    if (error) {
      console.error('Error fetching swing states:', error)
      return NextResponse.json(
        { error: 'Failed to fetch swing states' },
        { status: 500 }
      )
    }

    // Format the response to match expected structure
    const formattedData = data.map(record => ({
      name: record.states[0]?.name || 'Unknown',
      slug: record.states[0]?.slug || '',
      biden_final_percentage: 0, // Would need calculation from timeseries
      trump_final_percentage: 0, // Would need calculation from timeseries
      margin_of_victory: record.margin_2020 || 0,
      winner: record.winner_2020 || 'Unknown',
      total_votes_final: 0 // Would need calculation from timeseries
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}