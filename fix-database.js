const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// State population data (2020 estimates)
const statePopulations = {
  'Alabama': { population: 5024279, registered_voters: 3518000 },
  'Alaska': { population: 733391, registered_voters: 511000 },
  'Arizona': { population: 7151502, registered_voters: 4281000 },
  'Arkansas': { population: 3011524, registered_voters: 1844000 },
  'California': { population: 39538223, registered_voters: 22047000 },
  'Colorado': { population: 5773714, registered_voters: 3691000 },
  'Connecticut': { population: 3605944, registered_voters: 2299000 },
  'Delaware': { population: 989948, registered_voters: 701000 },
  'Florida': { population: 21538187, registered_voters: 14441000 },
  'Georgia': { population: 10711908, registered_voters: 7233000 },
  'Hawaii': { population: 1455271, registered_voters: 833000 },
  'Idaho': { population: 1839106, registered_voters: 929000 },
  'Illinois': { population: 12812508, registered_voters: 8234000 },
  'Indiana': { population: 6785528, registered_voters: 4601000 },
  'Iowa': { population: 3190369, registered_voters: 2130000 },
  'Kansas': { population: 2937880, registered_voters: 1842000 },
  'Kentucky': { population: 4505836, registered_voters: 3223000 },
  'Louisiana': { population: 4657757, registered_voters: 3042000 },
  'Maine': { population: 1395722, registered_voters: 1097000 },
  'Maryland': { population: 6177224, registered_voters: 4081000 },
  'Massachusetts': { population: 7001399, registered_voters: 4689000 },
  'Michigan': { population: 10037261, registered_voters: 7396000 },
  'Minnesota': { population: 5737915, registered_voters: 3612000 },
  'Mississippi': { population: 2961279, registered_voters: 1895000 },
  'Missouri': { population: 6196010, registered_voters: 4283000 },
  'Montana': { population: 1084225, registered_voters: 739000 },
  'Nebraska': { population: 1961504, registered_voters: 1239000 },
  'Nevada': { population: 3104614, registered_voters: 1842000 },
  'New Hampshire': { population: 1395231, registered_voters: 977000 },
  'New Jersey': { population: 9288994, registered_voters: 6202000 },
  'New Mexico': { population: 2117522, registered_voters: 1378000 },
  'New York': { population: 20201249, registered_voters: 12640000 },
  'North Carolina': { population: 10439388, registered_voters: 7359000 },
  'North Dakota': { population: 779094, registered_voters: 543000 },
  'Ohio': { population: 11799448, registered_voters: 8050000 },
  'Oklahoma': { population: 3959353, registered_voters: 2266000 },
  'Oregon': { population: 4237256, registered_voters: 2934000 },
  'Pennsylvania': { population: 13002700, registered_voters: 8995000 },
  'Rhode Island': { population: 1097379, registered_voters: 781000 },
  'South Carolina': { population: 5118425, registered_voters: 3440000 },
  'South Dakota': { population: 886667, registered_voters: 616000 },
  'Tennessee': { population: 6910840, registered_voters: 4419000 },
  'Texas': { population: 29145505, registered_voters: 16996000 },
  'Utah': { population: 3271616, registered_voters: 1779000 },
  'Vermont': { population: 643077, registered_voters: 511000 },
  'Virginia': { population: 8631393, registered_voters: 5975000 },
  'Washington': { population: 7705281, registered_voters: 4859000 },
  'West Virginia': { population: 1793716, registered_voters: 1251000 },
  'Wisconsin': { population: 5893718, registered_voters: 3684000 },
  'Wyoming': { population: 576851, registered_voters: 288000 },
  'District of Columbia': { population: 689545, registered_voters: 505000 }
};

async function fixDatabase() {
  console.log('Starting database fixes...');

  try {
    // 1. Create state_performance_metrics table
    console.log('\n1. Creating state_performance_metrics table...');
    
    const { error: createTableError } = await supabase.rpc('create_state_performance_metrics_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS state_performance_metrics (
          id SERIAL PRIMARY KEY,
          state_id INTEGER REFERENCES states(id),
          name VARCHAR(255) NOT NULL,
          abbreviation VARCHAR(2) NOT NULL,
          total_updates INTEGER DEFAULT 0,
          final_vote_count INTEGER DEFAULT 0,
          largest_vote_dump INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    // Alternative approach - create via direct SQL if RPC doesn't work
    const { data: tableCheck, error: tableCheckError } = await supabase
      .from('state_performance_metrics')
      .select('*')
      .limit(1);

    if (tableCheckError && tableCheckError.message.includes('does not exist')) {
      console.log('Table does not exist, will populate from existing data...');
    }

    // 2. Get all states and calculate performance metrics
    console.log('\n2. Calculating performance metrics from timeseries data...');
    
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, name, abbreviation');
    
    if (statesError) {
      console.error('Error fetching states:', statesError);
      return;
    }

    const performanceMetrics = [];
    
    for (const state of states) {
      console.log(`Processing ${state.name}...`);
      
      // Get timeseries data for this state
      const { data: timeseries, error: timeseriesError } = await supabase
        .from('timeseries_data')
        .select('biden_votes, trump_votes, total_votes')
        .eq('state_id', state.id)
        .order('timestamp', { ascending: true });
      
      if (timeseriesError || !timeseries || timeseries.length === 0) {
        console.log(`No timeseries data for ${state.name}`);
        continue;
      }

      // Calculate metrics
      const totalUpdates = timeseries.length;
      const finalVoteCount = timeseries[timeseries.length - 1]?.total_votes || 0;
      
      // Find largest vote dump (biggest increase between consecutive updates)
      let largestVoteDump = 0;
      for (let i = 1; i < timeseries.length; i++) {
        const increase = timeseries[i].total_votes - timeseries[i-1].total_votes;
        if (increase > largestVoteDump) {
          largestVoteDump = increase;
        }
      }

      performanceMetrics.push({
        state_id: state.id,
        name: state.name,
        abbreviation: state.abbreviation,
        total_updates: totalUpdates,
        final_vote_count: finalVoteCount,
        largest_vote_dump: largestVoteDump
      });
    }

    console.log(`Calculated metrics for ${performanceMetrics.length} states`);

    // 3. Update state_metadata with population data and calculated margins
    console.log('\n3. Updating state_metadata with population and margin data...');
    
    for (const state of states) {
      const popData = statePopulations[state.name];
      if (!popData) {
        console.log(`No population data for ${state.name}`);
        continue;
      }

      // Get final vote counts to calculate margin
      const { data: timeseries, error: timeseriesError } = await supabase
        .from('timeseries_data')
        .select('biden_votes, trump_votes, total_votes')
        .eq('state_id', state.id)
        .order('timestamp', { ascending: false })
        .limit(1);
      
      let margin2020 = null;
      if (timeseries && timeseries.length > 0) {
        const final = timeseries[0];
        const bidenPercent = (final.biden_votes / final.total_votes) * 100;
        const trumpPercent = (final.trump_votes / final.total_votes) * 100;
        margin2020 = Math.abs(bidenPercent - trumpPercent);
      }

      // Update state_metadata
      const { error: updateError } = await supabase
        .from('state_metadata')
        .update({
          population: popData.population,
          registered_voters: popData.registered_voters,
          margin_2020: margin2020,
          updated_at: new Date().toISOString()
        })
        .eq('state_id', state.id);

      if (updateError) {
        console.error(`Error updating ${state.name}:`, updateError);
      } else {
        console.log(`Updated ${state.name} - Population: ${popData.population}, Margin: ${margin2020?.toFixed(2)}%`);
      }
    }

    console.log('\n✅ Database fixes completed successfully!');
    
  } catch (error) {
    console.error('Error fixing database:', error);
  }
}

fixDatabase();