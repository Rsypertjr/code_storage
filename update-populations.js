const { createClient } = require('@supabase/supabase-js');

// Use service role key for updates - let me create a more direct approach
const supabase = createClient(
  'https://eeojgpxugehjidamxgbz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlb2pncHh1Z2VoamlkYW14Z2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjgxMDMsImV4cCI6MjA3NDc0NDEwM30.D9_9zXpcvBn_XDuoW-FXFVL00R9tmuTwPZ2Itjvp5Ks'
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
  'Georgia': { population: 10711908, registered_voters: 7233000 }
};

async function updatePopulations() {
  console.log('Updating state population data...');

  try {
    // Get states and metadata
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, name')
      .limit(10);
    
    if (statesError) {
      console.error('Error fetching states:', statesError);
      return;
    }

    for (const state of states) {
      const popData = statePopulations[state.name];
      if (!popData) {
        console.log(`No population data for ${state.name}`);
        continue;
      }

      console.log(`Updating ${state.name} with population: ${popData.population.toLocaleString()}`);
      
      // Check if we can query the metadata
      const { data: existing, error: queryError } = await supabase
        .from('state_metadata')
        .select('*')
        .eq('state_id', state.id)
        .single();

      if (queryError) {
        console.log(`Error querying ${state.name}:`, queryError.message);
        continue;
      }

      console.log(`Current metadata for ${state.name}:`, existing);
    }

    console.log('Population update check completed');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

updatePopulations();