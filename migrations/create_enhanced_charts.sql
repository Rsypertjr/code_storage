-- Create enhanced_charts table for storing analytical chart configurations
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enhanced_charts_state ON enhanced_charts(state);
CREATE INDEX IF NOT EXISTS idx_enhanced_charts_type ON enhanced_charts(chart_type);
CREATE INDEX IF NOT EXISTS idx_enhanced_charts_updated ON enhanced_charts(updated_at);

-- Add a comment describing the table
COMMENT ON TABLE enhanced_charts IS 'Stores enhanced analytical chart configurations and data for different states and chart types';