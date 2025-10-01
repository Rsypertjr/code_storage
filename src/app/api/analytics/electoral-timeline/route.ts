import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { ElectoralTimeline } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('electoral_timeline')
      .select('*')
      .order('called_at', { ascending: true })

    if (error) {
      console.error('Error fetching electoral timeline:', error)
      return NextResponse.json(
        { error: 'Failed to fetch electoral timeline' },
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