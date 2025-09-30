const fs = require('fs').promises;
const path = require('path');

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New-Hampshire',
  'New-Jersey', 'New-Mexico', 'New-York', 'North-Carolina', 'North-Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode-Island', 'South-Carolina', 'South-Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West-Virginia',
  'Wisconsin', 'Wyoming'
];

async function fetchElectionData(state) {
  try {
    const url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.toLowerCase().replace(/\-/g, '')}/president.json`;
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${state}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data for ${state}:`, error.message);
    return null;
  }
}

function processTimeseriesData(data, state) {
  const timeseries = data.data?.races?.[0]?.timeseries;
  
  if (!timeseries || !Array.isArray(timeseries)) {
    console.warn(`No timeseries data available for ${state}`);
    return null;
  }

  // Get final vote counts for calculations
  const finalEntry = timeseries[timeseries.length - 1];
  const totalVotesFinal = finalEntry?.votes || 0;

  const processedEntries = timeseries.map((votes, index) => {
    const currentVotes = votes.votes || 0;
    const bidenShare = votes.vote_shares?.bidenj || 0;
    const trumpShare = votes.vote_shares?.trumpd || 0;
    const otherShare = Math.max(0, 1 - bidenShare - trumpShare);
    
    // Calculate actual vote counts based on shares
    const biden_votes = Math.round(currentVotes * bidenShare);
    const trump_votes = Math.round(currentVotes * trumpShare);
    const other_votes = currentVotes - biden_votes - trump_votes;
    
    // Calculate vote additions from previous entry
    let total_vote_add = 0;
    let total_vote_add_biden = 0;
    let total_vote_add_trump = 0;
    let total_vote_add_other = 0;
    
    if (index > 0) {
      const prevEntry = timeseries[index - 1];
      const prevVotes = prevEntry?.votes || 0;
      const prevBidenVotes = Math.round(prevVotes * (prevEntry?.vote_shares?.bidenj || 0));
      const prevTrumpVotes = Math.round(prevVotes * (prevEntry?.vote_shares?.trumpd || 0));
      const prevOtherVotes = prevVotes - prevBidenVotes - prevTrumpVotes;
      
      total_vote_add = currentVotes - prevVotes;
      total_vote_add_biden = biden_votes - prevBidenVotes;
      total_vote_add_trump = trump_votes - prevTrumpVotes;
      total_vote_add_other = other_votes - prevOtherVotes;
    }
    
    const total_vote_add_total = total_vote_add_biden + total_vote_add_trump + total_vote_add_other;
    
    // Calculate percentage of remaining votes needed
    const remainingVotes = totalVotesFinal - currentVotes;
    const percent_of_remaining_trump = remainingVotes > 0 ? 
      Math.max(0, Math.min(100, ((totalVotesFinal * 0.5 - trump_votes) / remainingVotes) * 100)) : 0;
    const percent_of_remaining_biden = remainingVotes > 0 ? 
      Math.max(0, Math.min(100, ((totalVotesFinal * 0.5 - biden_votes) / remainingVotes) * 100)) : 0;

    return {
      index,
      votes: currentVotes,
      timestamp: votes.timestamp || '',
      bidenj: bidenShare,
      biden_votes,
      trumpd: trumpShare,
      trump_votes,
      other_votes,
      total_vote_add,
      total_vote_add_trump,
      total_vote_add_biden,
      total_vote_add_other,
      total_vote_add_total,
      percent_of_remaining_trump,
      percent_of_remaining_biden,
      time: votes.timestamp || ''
    };
  });

  const finalProcessedEntry = processedEntries[processedEntries.length - 1];

  return {
    state: state.replace(/-/g, ' '),
    data: processedEntries,
    metadata: {
      total_votes_final: totalVotesFinal,
      biden_final_votes: finalProcessedEntry?.biden_votes || 0,
      trump_final_votes: finalProcessedEntry?.trump_votes || 0,
      other_final_votes: finalProcessedEntry?.other_votes || 0,
      generated_at: new Date().toISOString()
    }
  };
}

async function generateAllTimeseriesData() {
  console.log('Starting timeseries data generation for all states...');
  
  const allData = {};
  const outputDir = path.join(__dirname, '..', 'db');
  const processedStatesFile = path.join(outputDir, 'processed-states.json');
  
  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating output directory:', error);
    return;
  }
  
  // Load existing processed states
  let processedStates = [];
  try {
    const existing = await fs.readFile(processedStatesFile, 'utf8');
    processedStates = JSON.parse(existing);
    console.log(`Found ${processedStates.length} previously processed states`);
  } catch (error) {
    console.log('No previous processed states found, starting fresh');
  }
  
  for (let i = 0; i < US_STATES.length; i++) {
    const state = US_STATES[i];
    console.log(`Processing ${state} (${i + 1}/${US_STATES.length})...`);
    
    const rawData = await fetchElectionData(state);
    if (rawData) {
      const processedData = processTimeseriesData(rawData, state);
      if (processedData) {
        allData[state] = processedData;
        
        // Save individual state file
        const stateFileName = `${state.toLowerCase().replace(/\s+/g, '-')}-timeseries.json`;
        const stateFilePath = path.join(outputDir, stateFileName);
        
        try {
          await fs.writeFile(stateFilePath, JSON.stringify(processedData, null, 2));
          console.log(`✓ Saved ${stateFileName}`);
          
          // Add to processed states if not already there
          if (!processedStates.includes(state)) {
            processedStates.push(state);
            // Save updated processed states list
            await fs.writeFile(processedStatesFile, JSON.stringify(processedStates, null, 2));
          }
        } catch (error) {
          console.error(`Error saving ${stateFileName}:`, error);
        }
      }
    }
    
    // Add delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Save combined file
  const combinedFileName = `all-states-timeseries-${new Date().toISOString().split('T')[0]}.json`;
  const combinedFilePath = path.join(outputDir, combinedFileName);
  
  try {
    await fs.writeFile(combinedFilePath, JSON.stringify(allData, null, 2));
    console.log(`✓ Saved combined file: ${combinedFileName}`);
    console.log(`✓ Generated timeseries data for ${Object.keys(allData).length} states`);
    console.log(`✓ Total processed states: ${processedStates.length}`);
    console.log(`✓ Files saved in: ${outputDir}`);
    console.log(`✓ Individual state files: db/[state]-timeseries.json`);
    console.log(`✓ Combined file: db/${combinedFileName}`);
    
    // Final save of processed states
    await fs.writeFile(processedStatesFile, JSON.stringify(processedStates, null, 2));
    console.log(`✓ Updated processed states tracking file`);
  } catch (error) {
    console.error('Error saving combined file:', error);
  }
}

// Run the script
if (require.main === module) {
  generateAllTimeseriesData().catch(console.error);
}

module.exports = { generateAllTimeseriesData, processTimeseriesData, fetchElectionData };