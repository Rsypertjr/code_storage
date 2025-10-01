import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  try {
    const stateSlug = params.state
    
    if (!stateSlug) {
      return NextResponse.json(
        { error: 'State name is required' },
        { status: 400 }
      )
    }
    
    // Get state info and timeseries data from Supabase
    const { data: stateData, error: stateError } = await supabase
      .from('states')
      .select(`
        id,
        name,
        slug,
        abbreviation,
        electoral_votes,
        state_metadata(
          winner_2020,
          margin_2020,
          swing_state
        )
      `)
      .eq('slug', stateSlug)
      .single()
    
    if (stateError || !stateData) {
      return NextResponse.json(
        { error: `State not found: ${stateSlug}` },
        { status: 404 }
      )
    }
    
    // Get timeseries data for this state
    const { data: timeseriesData, error: timeseriesError } = await supabase
      .from('timeseries_data')
      .select('*')
      .eq('state_id', stateData.id)
      .order('timestamp')
    
    if (timeseriesError) {
      console.error('Error fetching timeseries data:', timeseriesError)
      return NextResponse.json(
        { error: 'Failed to fetch timeseries data' },
        { status: 500 }
      )
    }
    
    // Format the response to match the expected structure
    const responseData = {
      state: stateData.name,
      slug: stateData.slug,
      abbreviation: stateData.abbreviation,
      electoral_votes: stateData.electoral_votes,
      metadata: {
        winner_2020: stateData.state_metadata?.[0]?.winner_2020 || null,
        margin_2020: stateData.state_metadata?.[0]?.margin_2020 || null,
        swing_state: stateData.state_metadata?.[0]?.swing_state || false,
        total_records: timeseriesData.length
      },
      data: timeseriesData.map(entry => ({
        timestamp: entry.timestamp,
        biden_votes: entry.biden_votes,
        trump_votes: entry.trump_votes,
        total_votes: entry.total_votes,
        biden_percentage: entry.biden_percentage,
        trump_percentage: entry.trump_percentage,
        margin: entry.margin,
        leading_candidate: entry.leading_candidate
      }))
    }
    
    return NextResponse.json(responseData)
    
  } catch (error) {
    console.error('Error in timeseries API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}