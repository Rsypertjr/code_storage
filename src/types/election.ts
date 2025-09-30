export interface Candidate {
  name: string
  party: string
  votes: number
  percentage: number
}

export interface StateData {
  state: string
  candidates: Candidate[]
  totalVotes: number
  reportingPercentage: number
}

// Raw API response types
export interface ElectionCandidate {
  name_display?: string
  last_name?: string
  party_id?: string
  votes?: number
  percentage?: number
}

export interface TimeseriesVotes {
  votes?: number
  timestamp?: string
  vote_shares?: {
    bidenj?: number
    trumpd?: number
    [key: string]: number | undefined
  }
}

export interface ElectionRace {
  state_name?: string
  candidates?: ElectionCandidate[]
  reporting?: number
  timeseries?: TimeseriesVotes[]
}

export interface ElectionData {
  data?: {
    races?: ElectionRace[]
  }
}