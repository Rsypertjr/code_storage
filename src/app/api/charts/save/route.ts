import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      state, 
      chart_type, 
      data_points, 
      chart_data, 
      statistical_analysis,
      timestamp 
    } = body

    // Save enhanced chart configuration
    const { data, error } = await supabase
      .from('enhanced_charts')
      .upsert({
        state: state,
        chart_type: chart_type,
        data_points: data_points,
        chart_data: chart_data,
        statistical_analysis: statistical_analysis,
        created_at: timestamp || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'state,chart_type,data_points'
      })

    if (error) {
      console.error('Error saving enhanced chart:', error)
      return NextResponse.json(
        { error: 'Failed to save enhanced chart', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Enhanced chart saved successfully',
      data: data
    })

  } catch (error) {
    console.error('Error in save enhanced chart API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state')

    let query = supabase
      .from('enhanced_charts')
      .select('*')
      .order('updated_at', { ascending: false })

    if (state) {
      query = query.eq('state', state)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching enhanced charts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch enhanced charts', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      charts: data || []
    })

  } catch (error) {
    console.error('Error in fetch enhanced charts API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}