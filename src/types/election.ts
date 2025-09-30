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

export interface NationalStateData {
  state: string
  totalVotes: number
  percentageOfNation: number
}

export interface NationalData {
  states: NationalStateData[]
  totalNationalVotes: number
}

export interface StateVsNationData {
  selectedState: {
    name: string
    totalVotes: number
    percentageOfNation: number
  }
  otherStates: {
    totalVotes: number
    percentageOfNation: number
  }
  totalNationalVotes: number
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