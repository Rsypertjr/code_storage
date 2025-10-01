-- Presidential Elections Database Schema (Fixed Version)
-- Run this in your Supabase SQL Editor

-- Step 1: Create Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Create States table
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  abbreviation VARCHAR(2) UNIQUE NOT NULL,
  electoral_votes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Insert States data
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
('Wyoming', 'wyoming', 'WY', 3)
ON CONFLICT (slug) DO NOTHING;

-- Step 4: Create State Metadata table
CREATE TABLE IF NOT EXISTS state_metadata (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  population BIGINT,
  registered_voters BIGINT,
  winner_2020 VARCHAR(20),
  margin_2020 DECIMAL(5,2),
  swing_state BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(state_id)
);

-- Step 5: Create Timeseries Data table
CREATE TABLE IF NOT EXISTS timeseries_data (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  biden_votes BIGINT DEFAULT 0,
  trump_votes BIGINT DEFAULT 0,
  total_votes BIGINT DEFAULT 0,
  biden_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes > 0 THEN (biden_votes::DECIMAL / total_votes * 100)
      ELSE 0 
    END
  ) STORED,
  trump_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes > 0 THEN (trump_votes::DECIMAL / total_votes * 100)
      ELSE 0 
    END
  ) STORED,
  margin DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_votes > 0 THEN ABS(biden_votes::DECIMAL - trump_votes::DECIMAL) / total_votes * 100
      ELSE 0 
    END
  ) STORED,
  leading_candidate VARCHAR(20) GENERATED ALWAYS AS (
    CASE 
      WHEN biden_votes > trump_votes THEN 'Biden'
      WHEN trump_votes > biden_votes THEN 'Trump'
      ELSE 'Tie'
    END
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_timeseries_state_timestamp ON timeseries_data(state_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_timeseries_timestamp ON timeseries_data(timestamp);

-- Test the setup
SELECT 'Schema setup complete!' as status, 
       (SELECT COUNT(*) FROM states) as states_count;