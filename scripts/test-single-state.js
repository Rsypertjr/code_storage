const fs = require('fs').promises;
const path = require('path');

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

async function generateSingleStateData(state) {
  console.log(`Generating timeseries data for ${state}...`);
  
  const outputDir = path.join(__dirname, '..', 'db');
  
  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating db directory:', error);
    return;
  }
  
  const rawData = await fetchElectionData(state);
  if (rawData) {
    const processedData = processTimeseriesData(rawData, state);
    if (processedData) {
      // Save individual state file
      const timestamp = new Date().toISOString().split('T')[0];
      const stateFileName = `${state.toLowerCase().replace(/\s+/g, '-')}-timeseries-${timestamp}.json`;
      const stateFilePath = path.join(outputDir, stateFileName);
      
      try {
        await fs.writeFile(stateFilePath, JSON.stringify(processedData, null, 2));
        console.log(`✓ Saved ${stateFileName} to db folder`);
        console.log(`✓ File contains ${processedData.data.length} timeseries entries`);
        console.log(`✓ Final vote count: ${processedData.metadata.total_votes_final.toLocaleString()}`);
      } catch (error) {
        console.error(`Error saving ${stateFileName}:`, error);
      }
    }
  }
}

// Get state from command line argument or default to California
const state = process.argv[2] || 'California';

if (require.main === module) {
  generateSingleStateData(state).catch(console.error);
}

module.exports = { generateSingleStateData };