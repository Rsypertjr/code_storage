const { createClient } = require('@supabase/supabase-js');

// Use anon key with public access
const supabase = createClient(
  'https://eeojgpxugehjidamxgbz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlb2pncHh1Z2VoamlkYW14Z2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjgxMDMsImV4cCI6MjA3NDc0NDEwM30.D9_9zXpcvBn_XDuoW-FXFVL00R9tmuTwPZ2Itjvp5Ks'
);

async function calculateMargins() {
  console.log('Calculating margins from timeseries data...');

  try {
    // Get all states
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, name, abbreviation');
    
    if (statesError) {
      console.error('Error fetching states:', statesError);
      return;
    }

    console.log(`Found ${states.length} states`);

    for (const state of states.slice(0, 5)) { // Test with first 5 states
      console.log(`\\nProcessing ${state.name}...`);
      
      // Get final timeseries entry for this state
      const { data: timeseries, error: timeseriesError } = await supabase
        .from('timeseries_data')
        .select('biden_votes, trump_votes, total_votes')
        .eq('state_id', state.id)
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (timeseriesError) {
        console.error(`Error fetching timeseries for ${state.name}:`, timeseriesError);
        continue;
      }

      if (!timeseries || timeseries.length === 0) {
        console.log(`No timeseries data for ${state.name}`);
        continue;
      }

      const final = timeseries[0];
      const bidenPercent = (final.biden_votes / final.total_votes) * 100;
      const trumpPercent = (final.trump_votes / final.total_votes) * 100;
      const margin = Math.abs(bidenPercent - trumpPercent);

      console.log(`${state.name}: Biden ${bidenPercent.toFixed(1)}%, Trump ${trumpPercent.toFixed(1)}%, Margin ${margin.toFixed(2)}%`);

      // Try to update (this may fail due to RLS policies)
      const { error: updateError } = await supabase
        .from('state_metadata')
        .update({
          margin_2020: margin,
          updated_at: new Date().toISOString()
        })
        .eq('state_id', state.id);

      if (updateError) {
        console.log(`Cannot update ${state.name} (likely RLS policy):`, updateError.message);
      } else {
        console.log(`✅ Updated ${state.name} margin: ${margin.toFixed(2)}%`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

calculateMargins();