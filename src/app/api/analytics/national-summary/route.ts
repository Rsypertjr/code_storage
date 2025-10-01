import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { NationalSummary } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Fetching national summary...')
    
    // Get all states with their latest timeseries data
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select(`
        id,
        name,
        electoral_votes,
        state_metadata (
          winner_2020,
          margin_2020,
          swing_state
        )
      `)

    if (statesError) {
      console.error('Error fetching states:', statesError)
      return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 })
    }

    // Get the latest vote totals for each state from timeseries data
    let totalBidenVotes = 0
    let totalTrumpVotes = 0
    let totalVotes = 0
    let bidenStatesWon = 0
    let trumpStatesWon = 0
    let bidenElectoralVotes = 0
    let trumpElectoralVotes = 0

    for (const state of states) {
      // Get the latest timeseries entry for this state
      const { data: latestEntry, error: timeseriesError } = await supabase
        .from('timeseries_data')
        .select('biden_votes, trump_votes, total_votes')
        .eq('state_id', state.id)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single()

      if (!timeseriesError && latestEntry) {
        totalBidenVotes += latestEntry.biden_votes || 0
        totalTrumpVotes += latestEntry.trump_votes || 0
        totalVotes += latestEntry.total_votes || 0

        // Determine winner and add electoral votes
        const bidenWon = latestEntry.biden_votes > latestEntry.trump_votes
        if (bidenWon) {
          bidenStatesWon++
          bidenElectoralVotes += state.electoral_votes || 0
        } else {
          trumpStatesWon++
          trumpElectoralVotes += state.electoral_votes || 0
        }
      }
    }

    const bidenPercentage = totalVotes > 0 ? (totalBidenVotes / totalVotes) * 100 : 0
    const trumpPercentage = totalVotes > 0 ? (totalTrumpVotes / totalVotes) * 100 : 0

    const summary = {
      total_votes_national: totalVotes,
      biden_total_votes: totalBidenVotes,
      trump_total_votes: totalTrumpVotes,
      biden_national_percentage: bidenPercentage,
      trump_national_percentage: trumpPercentage,
      biden_states_won: bidenStatesWon,
      trump_states_won: trumpStatesWon,
      biden_electoral_votes: bidenElectoralVotes,
      trump_electoral_votes: trumpElectoralVotes,
      swing_states_count: states.filter(s => s.state_metadata?.[0]?.swing_state).length,
      total_states: states.length
    }

    console.log('National summary calculated:', summary)
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}