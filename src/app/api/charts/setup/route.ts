import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Since we can't run raw SQL directly, let's try to create a test record 
    // which will help us understand if the table exists
    const { data, error } = await supabase
      .from('enhanced_charts')
      .select('*')
      .limit(1)

    if (error && error.message.includes('does not exist')) {
      // Table doesn't exist, we need to create it via Supabase dashboard
      return NextResponse.json({
        success: false,
        error: 'enhanced_charts table does not exist. Please create it via Supabase dashboard.',
        sql: `
CREATE TABLE enhanced_charts (
    id BIGSERIAL PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    chart_type VARCHAR(100) NOT NULL,
    data_points INTEGER NOT NULL,
    chart_data JSONB,
    statistical_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (state, chart_type, data_points)
);

CREATE INDEX idx_enhanced_charts_state ON enhanced_charts(state);
CREATE INDEX idx_enhanced_charts_type ON enhanced_charts(chart_type);
CREATE INDEX idx_enhanced_charts_updated ON enhanced_charts(updated_at);
        `
      })
    }

    return NextResponse.json({
      success: true,
      message: 'enhanced_charts table exists and is accessible',
      data: data
    })

  } catch (error) {
    console.error('Error checking enhanced_charts table:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}