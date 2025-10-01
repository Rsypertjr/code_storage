-- Presidential Election Data Schema with Analytics Features
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. States Table
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  abbreviation VARCHAR(2) UNIQUE NOT NULL,
  electoral_votes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. State Metadata Table (final results per state)
CREATE TABLE state_metadata (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  total_votes_final INTEGER NOT NULL,
  biden_final_votes INTEGER NOT NULL,
  trump_final_votes INTEGER NOT NULL,
  other_final_votes INTEGER NOT NULL,
  biden_final_percentage DECIMAL(6,3) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes_final > 0 THEN (biden_final_votes::DECIMAL / total_votes_final) * 100
      ELSE 0
    END
  ) STORED,
  trump_final_percentage DECIMAL(6,3) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes_final > 0 THEN (trump_final_votes::DECIMAL / total_votes_final) * 100
      ELSE 0
    END
  ) STORED,
  margin_of_victory DECIMAL(6,3) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes_final > 0 THEN ABS((biden_final_votes::DECIMAL / total_votes_final) * 100 - (trump_final_votes::DECIMAL / total_votes_final) * 100)
      ELSE 0
    END
  ) STORED,
  winner VARCHAR(20) GENERATED ALWAYS AS (
    CASE 
      WHEN biden_final_votes > trump_final_votes THEN 'Biden'
      WHEN trump_final_votes > biden_final_votes THEN 'Trump'
      ELSE 'Tie'
    END
  ) STORED,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(state_id)
);

-- 3. Timeseries Data Table
CREATE TABLE timeseries_data (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  index_position INTEGER NOT NULL,
  votes INTEGER NOT NULL,
  timestamp_recorded TIMESTAMP WITH TIME ZONE NOT NULL,
  biden_percentage DECIMAL(6,3) NOT NULL,
  biden_votes INTEGER NOT NULL,
  trump_percentage DECIMAL(6,3) NOT NULL,
  trump_votes INTEGER NOT NULL,
  other_votes INTEGER NOT NULL,
  total_vote_add INTEGER NOT NULL,
  total_vote_add_trump INTEGER NOT NULL,
  total_vote_add_biden INTEGER NOT NULL,
  total_vote_add_other INTEGER NOT NULL,
  total_vote_add_total INTEGER NOT NULL,
  percent_of_remaining_trump DECIMAL(8,3) NOT NULL,
  percent_of_remaining_biden DECIMAL(8,3) NOT NULL,
  -- Derived analytics columns
  vote_momentum_biden INTEGER GENERATED ALWAYS AS (total_vote_add_biden) STORED,
  vote_momentum_trump INTEGER GENERATED ALWAYS AS (total_vote_add_trump) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_state_index UNIQUE(state_id, index_position)
);

-- Indexes for performance
CREATE INDEX idx_timeseries_state_timestamp ON timeseries_data(state_id, timestamp_recorded);
CREATE INDEX idx_timeseries_state_index ON timeseries_data(state_id, index_position);
CREATE INDEX idx_timeseries_timestamp ON timeseries_data(timestamp_recorded);
CREATE INDEX idx_timeseries_biden_votes ON timeseries_data(biden_votes);
CREATE INDEX idx_timeseries_trump_votes ON timeseries_data(trump_votes);

-- 4. Analytics Views

-- National Summary View
CREATE VIEW national_summary AS
SELECT 
  SUM(sm.total_votes_final) as total_votes_national,
  SUM(sm.biden_final_votes) as biden_total_votes,
  SUM(sm.trump_final_votes) as trump_total_votes,
  SUM(sm.other_final_votes) as other_total_votes,
  ROUND(SUM(sm.biden_final_votes)::DECIMAL / SUM(sm.total_votes_final) * 100, 3) as biden_national_percentage,
  ROUND(SUM(sm.trump_final_votes)::DECIMAL / SUM(sm.total_votes_final) * 100, 3) as trump_national_percentage,
  COUNT(CASE WHEN sm.winner = 'Biden' THEN 1 END) as biden_states_won,
  COUNT(CASE WHEN sm.winner = 'Trump' THEN 1 END) as trump_states_won,
  ROUND(AVG(sm.margin_of_victory), 3) as avg_margin_of_victory
FROM state_metadata sm;

-- Swing States Analysis (states with <5% margin)
CREATE VIEW swing_states AS
SELECT 
  s.name,
  s.slug,
  sm.biden_final_percentage,
  sm.trump_final_percentage,
  sm.margin_of_victory,
  sm.winner,
  sm.total_votes_final
FROM states s
JOIN state_metadata sm ON s.id = sm.state_id
WHERE sm.margin_of_victory < 5.0
ORDER BY sm.margin_of_victory ASC;

-- Vote Reporting Timeline (hourly aggregation)
CREATE VIEW vote_reporting_timeline AS
SELECT 
  DATE_TRUNC('hour', td.timestamp_recorded) as hour_bucket,
  COUNT(DISTINCT td.state_id) as states_reporting,
  SUM(td.total_vote_add) as votes_added_this_hour,
  SUM(td.total_vote_add_biden) as biden_votes_added,
  SUM(td.total_vote_add_trump) as trump_votes_added,
  ROUND(AVG(td.biden_percentage), 3) as avg_biden_percentage,
  ROUND(AVG(td.trump_percentage), 3) as avg_trump_percentage
FROM timeseries_data td
WHERE td.total_vote_add > 0
GROUP BY DATE_TRUNC('hour', td.timestamp_recorded)
ORDER BY hour_bucket;

-- State Performance Metrics
CREATE VIEW state_performance_metrics AS
SELECT 
  s.name,
  s.slug,
  COUNT(td.id) as total_updates,
  MIN(td.timestamp_recorded) as first_report,
  MAX(td.timestamp_recorded) as last_report,
  MAX(td.timestamp_recorded) - MIN(td.timestamp_recorded) as reporting_duration,
  MAX(td.votes) as final_vote_count,
  -- Vote momentum analysis
  SUM(CASE WHEN td.total_vote_add_biden > td.total_vote_add_trump THEN 1 ELSE 0 END) as biden_favorable_updates,
  SUM(CASE WHEN td.total_vote_add_trump > td.total_vote_add_biden THEN 1 ELSE 0 END) as trump_favorable_updates,
  -- Largest single vote dumps
  MAX(td.total_vote_add) as largest_vote_dump,
  MAX(td.total_vote_add_biden) as largest_biden_dump,
  MAX(td.total_vote_add_trump) as largest_trump_dump
FROM states s
JOIN timeseries_data td ON s.id = td.state_id
GROUP BY s.id, s.name, s.slug
ORDER BY s.name;

-- Electoral Timeline (when states were "called")
-- Using a simple heuristic: when vote difference became > 1% and stayed that way
CREATE VIEW electoral_timeline AS
WITH state_calls AS (
  SELECT DISTINCT ON (td.state_id)
    s.name,
    s.slug,
    td.timestamp_recorded as called_at,
    td.biden_percentage,
    td.trump_percentage,
    ABS(td.biden_percentage - td.trump_percentage) as margin_at_call,
    CASE 
      WHEN td.biden_votes > td.trump_votes THEN 'Biden'
      ELSE 'Trump'
    END as projected_winner
  FROM timeseries_data td
  JOIN states s ON td.state_id = s.id
  WHERE ABS(td.biden_percentage - td.trump_percentage) > 1.0
    AND td.votes > (
      SELECT MAX(votes) * 0.3 -- At least 30% of votes counted
      FROM timeseries_data td2 
      WHERE td2.state_id = td.state_id
    )
  ORDER BY td.state_id, td.timestamp_recorded
)
SELECT *
FROM state_calls
ORDER BY called_at;

-- Competitive Analysis: Track lead changes
CREATE VIEW lead_changes AS
SELECT 
  s.name,
  s.slug,
  td.timestamp_recorded,
  td.biden_votes,
  td.trump_votes,
  td.biden_percentage,
  td.trump_percentage,
  td.votes as total_votes_at_time,
  LAG(td.biden_votes > td.trump_votes) OVER (PARTITION BY s.id ORDER BY td.index_position) as prev_biden_leading,
  (td.biden_votes > td.trump_votes) as biden_leading,
  CASE 
    WHEN (td.biden_votes > td.trump_votes) != LAG(td.biden_votes > td.trump_votes) OVER (PARTITION BY s.id ORDER BY td.index_position) 
    THEN TRUE 
    ELSE FALSE 
  END as lead_changed
FROM states s
JOIN timeseries_data td ON s.id = td.state_id
ORDER BY s.name, td.index_position;

-- Functions for advanced analytics

-- Function to get vote momentum for a state over time
CREATE OR REPLACE FUNCTION get_vote_momentum(state_slug TEXT, hours_back INTEGER DEFAULT 2)
RETURNS TABLE (
  timestamp_recorded TIMESTAMP WITH TIME ZONE,
  biden_momentum INTEGER,
  trump_momentum INTEGER,
  net_momentum INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    td.timestamp_recorded,
    td.total_vote_add_biden,
    td.total_vote_add_trump,
    (td.total_vote_add_biden - td.total_vote_add_trump) as net_momentum
  FROM timeseries_data td
  JOIN states s ON td.state_id = s.id
  WHERE s.slug = state_slug
    AND td.timestamp_recorded >= NOW() - INTERVAL '1 hour' * hours_back
    AND td.total_vote_add > 0
  ORDER BY td.timestamp_recorded DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate when a state becomes "safe" (>5% lead maintained)
CREATE OR REPLACE FUNCTION get_safe_states(min_lead_percentage DECIMAL DEFAULT 5.0)
RETURNS TABLE (
  state_name TEXT,
  state_slug TEXT,
  safe_at TIMESTAMP WITH TIME ZONE,
  final_margin DECIMAL,
  winner TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH safe_points AS (
    SELECT DISTINCT ON (td.state_id)
      s.name,
      s.slug,
      td.timestamp_recorded,
      ABS(td.biden_percentage - td.trump_percentage) as margin,
      CASE WHEN td.biden_votes > td.trump_votes THEN 'Biden' ELSE 'Trump' END as leader
    FROM timeseries_data td
    JOIN states s ON td.state_id = s.id
    WHERE ABS(td.biden_percentage - td.trump_percentage) >= min_lead_percentage
    ORDER BY td.state_id, td.timestamp_recorded
  )
  SELECT 
    sp.name,
    sp.slug,
    sp.timestamp_recorded,
    sp.margin,
    sp.leader
  FROM safe_points sp
  ORDER BY sp.timestamp_recorded;
END;
$$ LANGUAGE plpgsql;

-- Insert initial state data
INSERT INTO states (name, slug, abbreviation, electoral_votes) VALUES
('Alabama', 'alabama', 'AL', 9),
('Alaska', 'alaska', 'AK', 3),
('Arizona', 'arizona', 'AZ', 11),
('Arkansas', 'arkansas', 'AR', 6),
('California', 'california', 'CA', 54),
('Colorado', 'colorado', 'CO', 10),
('Connecticut', 'connecticut', 'CT', 7),
('Delaware', 'delaware', 'DE', 3),
('District of Columbia', 'district-of-columbia', 'DC', 3),
('Florida', 'florida', 'FL', 30),
('Georgia', 'georgia', 'GA', 16),
('Hawaii', 'hawaii', 'HI', 4),
('Idaho', 'idaho', 'ID', 4),
('Illinois', 'illinois', 'IL', 19),
('Indiana', 'indiana', 'IN', 11),
('Iowa', 'iowa', 'IA', 6),
('Kansas', 'kansas', 'KS', 6),
('Kentucky', 'kentucky', 'KY', 8),
('Louisiana', 'louisiana', 'LA', 8),
('Maine', 'maine', 'ME', 4),
('Maryland', 'maryland', 'MD', 10),
('Massachusetts', 'massachusetts', 'MA', 11),
('Michigan', 'michigan', 'MI', 15),
('Minnesota', 'minnesota', 'MN', 10),
('Mississippi', 'mississippi', 'MS', 6),
('Missouri', 'missouri', 'MO', 10),
('Montana', 'montana', 'MT', 4),
('Nebraska', 'nebraska', 'NE', 5),
('Nevada', 'nevada', 'NV', 6),
('New Hampshire', 'new-hampshire', 'NH', 4),
('New Jersey', 'new-jersey', 'NJ', 14),
('New Mexico', 'new-mexico', 'NM', 5),
('New York', 'new-york', 'NY', 28),
('North Carolina', 'north-carolina', 'NC', 16),
('North Dakota', 'north-dakota', 'ND', 3),
('Ohio', 'ohio', 'OH', 17),
('Oklahoma', 'oklahoma', 'OK', 7),
('Oregon', 'oregon', 'OR', 8),
('Pennsylvania', 'pennsylvania', 'PA', 19),
('Rhode Island', 'rhode-island', 'RI', 4),
('South Carolina', 'south-carolina', 'SC', 9),
('South Dakota', 'south-dakota', 'SD', 3),
('Tennessee', 'tennessee', 'TN', 11),
('Texas', 'texas', 'TX', 40),
('Utah', 'utah', 'UT', 6),
('Vermont', 'vermont', 'VT', 3),
('Virginia', 'virginia', 'VA', 13),
('Washington', 'washington', 'WA', 12),
('West Virginia', 'west-virginia', 'WV', 4),
('Wisconsin', 'wisconsin', 'WI', 10),
('Wyoming', 'wyoming', 'WY', 3);

-- Create RLS policies (optional - for future security)
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeseries_data ENABLE ROW LEVEL SECURITY;

-- Allow read access to all tables (adjust as needed)
CREATE POLICY "Allow read access" ON states FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON state_metadata FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON timeseries_data FOR SELECT USING (true);