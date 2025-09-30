import { ElectionData } from '@/types/election'

export interface TimeseriesEntry {
  index: number
  votes: number
  timestamp: string
  bidenj: number
  biden_votes: number
  trumpd: number
  trump_votes: number
  other_votes: number
  total_vote_add: number
  total_vote_add_trump: number
  total_vote_add_biden: number
  total_vote_add_other: number
  total_vote_add_total: number
  percent_of_remaining_trump: number
  percent_of_remaining_biden: number
  time: string
}

export interface ProcessedTimeseries {
  state: string
  data: TimeseriesEntry[]
  metadata: {
    total_votes_final: number
    biden_final_votes: number
    trump_final_votes: number
    other_final_votes: number
    generated_at: string
  }
}

export async function fetchAndProcessTimeseries(state: string): Promise<ProcessedTimeseries | null> {
  try {
    const url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.toLowerCase().replace(/\-/g, '')}/president.json`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${state}`)
    }
    
    const data: ElectionData = await response.json()
    const timeseries = data.data?.races?.[0]?.timeseries
    
    if (!timeseries || !Array.isArray(timeseries)) {
      throw new Error('No timeseries data available')
    }

    // Get final vote counts for calculations
    const finalEntry = timeseries[timeseries.length - 1]
    const totalVotesFinal = finalEntry?.votes || 0
    
    const processedEntries: TimeseriesEntry[] = timeseries.map((votes: any, index: number) => {
      const currentVotes = votes.votes || 0
      const bidenShare = votes.vote_shares?.bidenj || 0
      const trumpShare = votes.vote_shares?.trumpd || 0
      const otherShare = Math.max(0, 1 - bidenShare - trumpShare)
      
      // Calculate actual vote counts based on shares
      const biden_votes = Math.round(currentVotes * bidenShare)
      const trump_votes = Math.round(currentVotes * trumpShare)
      const other_votes = currentVotes - biden_votes - trump_votes
      
      // Calculate vote additions from previous entry
      let total_vote_add = 0
      let total_vote_add_biden = 0
      let total_vote_add_trump = 0
      let total_vote_add_other = 0
      
      if (index > 0) {
        const prevEntry = timeseries[index - 1]
        const prevVotes = prevEntry?.votes || 0
        const prevBidenVotes = Math.round(prevVotes * (prevEntry?.vote_shares?.bidenj || 0))
        const prevTrumpVotes = Math.round(prevVotes * (prevEntry?.vote_shares?.trumpd || 0))
        const prevOtherVotes = prevVotes - prevBidenVotes - prevTrumpVotes
        
        total_vote_add = currentVotes - prevVotes
        total_vote_add_biden = biden_votes - prevBidenVotes
        total_vote_add_trump = trump_votes - prevTrumpVotes
        total_vote_add_other = other_votes - prevOtherVotes
      }
      
      const total_vote_add_total = total_vote_add_biden + total_vote_add_trump + total_vote_add_other
      
      // Calculate percentage of remaining votes needed
      const remainingVotes = totalVotesFinal - currentVotes
      const percent_of_remaining_trump = remainingVotes > 0 ? 
        Math.max(0, Math.min(100, ((totalVotesFinal * 0.5 - trump_votes) / remainingVotes) * 100)) : 0
      const percent_of_remaining_biden = remainingVotes > 0 ? 
        Math.max(0, Math.min(100, ((totalVotesFinal * 0.5 - biden_votes) / remainingVotes) * 100)) : 0

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
      }
    })

    const finalProcessedEntry = processedEntries[processedEntries.length - 1]

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
    }

  } catch (error) {
    console.error(`Error processing timeseries for ${state}:`, error)
    return null
  }
}

export async function generateTimeseriesJson(states: string[]): Promise<void> {
  const allData: { [key: string]: ProcessedTimeseries } = {}
  
  for (const state of states) {
    console.log(`Processing ${state}...`)
    const data = await fetchAndProcessTimeseries(state)
    if (data) {
      allData[state] = data
    }
    // Add delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Create JSON file content
  const jsonContent = JSON.stringify(allData, null, 2)
  
  // In a browser environment, trigger download
  if (typeof window !== 'undefined') {
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `election-timeseries-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  console.log('Timeseries JSON generated successfully')
}