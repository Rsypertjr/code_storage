import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get database stats
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, name')
    
    const { data: metadata, error: metadataError } = await supabase
      .from('state_metadata')
      .select('population, registered_voters, margin_2020, winner_2020')
    
    const { data: timeseries, error: timeseriesError } = await supabase
      .from('timeseries_data')
      .select('id')
    
    if (statesError || metadataError || timeseriesError) {
      return NextResponse.json({
        error: 'Database query error',
        details: { statesError, metadataError, timeseriesError }
      }, { status: 500 })
    }

    // Count non-null values
    const populationCount = metadata?.filter(m => m.population !== null).length || 0
    const registeredVotersCount = metadata?.filter(m => m.registered_voters !== null).length || 0
    const marginCount = metadata?.filter(m => m.margin_2020 !== null).length || 0

    return NextResponse.json({
      success: true,
      database_status: 'Connected to Supabase',
      states_available: states?.length || 0,
      timeseries_records: timeseries?.length || 0,
      metadata_completeness: {
        population_filled: `${populationCount}/${metadata?.length || 0}`,
        registered_voters_filled: `${registeredVotersCount}/${metadata?.length || 0}`,
        margin_2020_filled: `${marginCount}/${metadata?.length || 0}`
      },
      features_available: {
        state_selection: true,
        timeseries_charts: true,
        analytics_dashboard: true,
        database_driven: true,
        file_system_dependency: false
      },
      sample_states: states?.slice(0, 5).map(s => s.name) || []
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}