import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  try {
    const stateSlug = params.state.toLowerCase()

    // Get state info and timeseries data
    const { data: stateData, error: stateError } = await supabase
      .from('states')
      .select(`
        id,
        name,
        slug,
        state_metadata (
          total_votes_final,
          biden_final_votes,
          trump_final_votes,
          other_final_votes,
          generated_at
        )
      `)
      .eq('slug', stateSlug)
      .single()

    if (stateError || !stateData) {
      return NextResponse.json(
        { error: 'State not found' },
        { status: 404 }
      )
    }

    // Get timeseries data
    const { data: timeseriesData, error: timeseriesError } = await supabase
      .from('timeseries_data')
      .select('*')
      .eq('state_id', stateData.id)
      .order('index_position', { ascending: true })

    if (timeseriesError) {
      console.error('Error fetching timeseries data:', timeseriesError)
      return NextResponse.json(
        { error: 'Failed to fetch timeseries data' },
        { status: 500 }
      )
    }

    // Convert to the format expected by the frontend
    const responseData = {
      state: stateData.name,
      data: timeseriesData?.map(entry => ({
        index: entry.index_position,
        votes: entry.votes,
        timestamp: entry.timestamp_recorded,
        bidenj: entry.biden_percentage,
        biden_votes: entry.biden_votes,
        trumpd: entry.trump_percentage,
        trump_votes: entry.trump_votes,
        other_votes: entry.other_votes,
        total_vote_add: entry.total_vote_add,
        total_vote_add_trump: entry.total_vote_add_trump,
        total_vote_add_biden: entry.total_vote_add_biden,
        total_vote_add_other: entry.total_vote_add_other,
        total_vote_add_total: entry.total_vote_add_total,
        percent_of_remaining_trump: entry.percent_of_remaining_trump,
        percent_of_remaining_biden: entry.percent_of_remaining_biden,
        time: entry.timestamp_recorded
      })) || [],
      metadata: stateData.state_metadata?.[0] ? {
        total_votes_final: stateData.state_metadata[0].total_votes_final,
        biden_final_votes: stateData.state_metadata[0].biden_final_votes,
        trump_final_votes: stateData.state_metadata[0].trump_final_votes,
        other_final_votes: stateData.state_metadata[0].other_final_votes,
        generated_at: stateData.state_metadata[0].generated_at
      } : null
    }

    return NextResponse.json(responseData)

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}