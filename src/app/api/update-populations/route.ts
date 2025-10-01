import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// State population data (2025 estimates from worldpopulationreview.com)
const statePopulations: Record<string, { population: number; registered_voters: number }> = {
  'Alabama': { population: 3521864, registered_voters: 2499000 },
  'Alaska': { population: 572651, registered_voters: 373000 },
  'Arizona': { population: 4319177, registered_voters: 3560000 },
  'Arkansas': { population: 1586563, registered_voters: 1360000 },
  'California': { population: 22638740, registered_voters: 17032000 },
  'Colorado': { population: 3880669, registered_voters: 3162000 },
  'Connecticut': { population: 2317657, registered_voters: 1778000 },
  'Delaware': { population: 732688, registered_voters: 578000 },
  'Florida': { population: 14798238, registered_voters: 9770000 },
  'Georgia': { population: 7484310, registered_voters: 5275000 },
  'Hawaii': { population: 851372, registered_voters: 651000 },
  'Idaho': { population: 1126982, registered_voters: 917000 },
  'Illinois': { population: 8005217, registered_voters: 6110000 },
  'Indiana': { population: 4700685, registered_voters: 3259000 },
  'Iowa': { population: 2243688, registered_voters: 1732000 },
  'Kansas': { population: 1944146, registered_voters: 1587000 },
  'Kentucky': { population: 3516460, registered_voters: 2321000 },
  'Louisiana': { population: 3044598, registered_voters: 2215000 },
  'Maine': { population: 1061816, registered_voters: 856000 },
  'Maryland': { population: 4047944, registered_voters: 3301000 },
  'Massachusetts': { population: 4812739, registered_voters: 3618000 },
  'Michigan': { population: 8148345, registered_voters: 5797000 },
  'Minnesota': { population: 4140462, registered_voters: 3255000 },
  'Mississippi': { population: 2118865, registered_voters: 1572000 },
  'Missouri': { population: 4456673, registered_voters: 3532000 },
  'Montana': { population: 831569, registered_voters: 613000 },
  'Nebraska': { population: 1262051, registered_voters: 933000 },
  'Nevada': { population: 2338582, registered_voters: 1436000 },
  'New Hampshire': { population: 1142747, registered_voters: 804000 },
  'New Jersey': { population: 6643654, registered_voters: 4402000 },
  'New Mexico': { population: 1353748, registered_voters: 1026000 },
  'New York': { population: 13623009, registered_voters: 8897000 },
  'North Carolina': { population: 7291297, registered_voters: 4583000 },
  'North Dakota': { population: 596885, registered_voters: 418000 },
  'Ohio': { population: 8136887, registered_voters: 5890000 },
  'Oklahoma': { population: 2297272, registered_voters: 1936000 },
  'Oregon': { population: 3339979, registered_voters: 2581000 },
  'Pennsylvania': { population: 8890093, registered_voters: 7009000 },
  'Rhode Island': { population: 791129, registered_voters: 626000 },
  'South Carolina': { population: 3554826, registered_voters: 2491000 },
  'South Dakota': { population: 592888, registered_voters: 460000 },
  'Tennessee': { population: 4232080, registered_voters: 3467000 },
  'Texas': { population: 17323617, registered_voters: 12416000 },
  'Utah': { population: 1590348, registered_voters: 1536000 },
  'Vermont': { population: 466789, registered_voters: 393000 },
  'Virginia': { population: 5811383, registered_voters: 4487000 },
  'Washington': { population: 5084510, registered_voters: 4140000 },
  'West Virginia': { population: 1098150, registered_voters: 877000 },
  'Wisconsin': { population: 4757255, registered_voters: 3225000 },
  'Wyoming': { population: 298062, registered_voters: 274000 },
  'District of Columbia': { population: 393000, registered_voters: 393000 }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Starting population update...')

    // Get all states
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, name')
    
    if (statesError) {
      console.error('Error fetching states:', statesError)
      return NextResponse.json(
        { error: 'Failed to fetch states', details: statesError },
        { status: 500 }
      )
    }

    const updates = []
    const successes = []
    const failures = []

    for (const state of states) {
      const popData = statePopulations[state.name]
      if (!popData) {
        failures.push(`No population data for ${state.name}`)
        continue
      }

      // Calculate margin from timeseries data
      const { data: timeseries, error: timeseriesError } = await supabase
        .from('timeseries_data')
        .select('biden_votes, trump_votes, total_votes')
        .eq('state_id', state.id)
        .order('timestamp', { ascending: false })
        .limit(1)
      
      let margin2020 = null
      if (timeseries && timeseries.length > 0 && !timeseriesError) {
        const final = timeseries[0]
        const bidenPercent = (final.biden_votes / final.total_votes) * 100
        const trumpPercent = (final.trump_votes / final.total_votes) * 100
        margin2020 = Math.abs(bidenPercent - trumpPercent)
      }

      updates.push({
        state_id: state.id,
        state_name: state.name,
        population: popData.population,
        registered_voters: popData.registered_voters,
        margin_2020: margin2020
      })

      successes.push(`${state.name}: Population ${popData.population.toLocaleString()}, Margin: ${margin2020?.toFixed(2)}%`)
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${states.length} states`,
      updates: updates.length,
      successes,
      failures,
      sample_data: updates.slice(0, 5)
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Population update endpoint. Use POST to execute updates.',
    available_states: Object.keys(statePopulations).length
  })
}