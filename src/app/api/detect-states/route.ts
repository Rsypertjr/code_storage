import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const detailed = searchParams.get('detailed') === 'true'
    
    // Get states from Supabase
    const { data: states, error } = await supabase
      .from('states')
      .select(`
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
      .order('name')
    
    if (error) {
      console.error('Error fetching states from Supabase:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch states from database',
        states: [],
        count: 0
      }, { status: 500 })
    }
    
    // Always return StateInfo structure for consistency
    const stateInfos = states.map(state => ({
      name: state.name,
      slug: state.slug,
      abbreviation: state.abbreviation,
      electoral_votes: state.electoral_votes,
      // Include metadata only if detailed is requested
      ...(detailed && {
        winner_2020: state.state_metadata?.[0]?.winner_2020 || null,
        margin_2020: state.state_metadata?.[0]?.margin_2020 || null,
        swing_state: state.state_metadata?.[0]?.swing_state || false
      })
    }))
    
    return NextResponse.json({
      success: true,
      states: stateInfos,
      count: stateInfos.length
    })
  } catch (error) {
    console.error('Error detecting states:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to detect states from database',
      states: [],
      count: 0
    }, { status: 500 })
  }
}