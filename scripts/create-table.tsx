import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function createEnhancedChartsTable() {
  const { data, error } = await supabase.rpc('create_enhanced_charts_table', {
    query: `
      CREATE TABLE IF NOT EXISTS enhanced_charts (
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

      CREATE INDEX IF NOT EXISTS idx_enhanced_charts_state ON enhanced_charts(state);
      CREATE INDEX IF NOT EXISTS idx_enhanced_charts_type ON enhanced_charts(chart_type);
      CREATE INDEX IF NOT EXISTS idx_enhanced_charts_updated ON enhanced_charts(updated_at);
    `
  })

  if (error) {
    console.error('Error creating table:', error)
  } else {
    console.log('Table created successfully:', data)
  }
}

createEnhancedChartsTable()