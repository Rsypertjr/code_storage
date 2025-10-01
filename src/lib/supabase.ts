import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/frontend use
export const supabase = createClient(supabaseUrl, supabaseKey)

// Admin client for server-side operations (data migration, etc.)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types (generated from schema)
export interface State {
  id: number
  name: string
  slug: string
  abbreviation: string
  electoral_votes: number | null
  created_at: string
  updated_at: string
}

export interface StateMetadata {
  id: number
  state_id: number
  total_votes_final: number
  biden_final_votes: number
  trump_final_votes: number
  other_final_votes: number
  biden_final_percentage: number
  trump_final_percentage: number
  margin_of_victory: number
  winner: string
  generated_at: string
  created_at: string
}

export interface TimeseriesData {
  id: number
  state_id: number
  index_position: number
  votes: number
  timestamp_recorded: string
  biden_percentage: number
  biden_votes: number
  trump_percentage: number
  trump_votes: number
  other_votes: number
  total_vote_add: number
  total_vote_add_trump: number
  total_vote_add_biden: number
  total_vote_add_other: number
  total_vote_add_total: number
  percent_of_remaining_trump: number
  percent_of_remaining_biden: number
  vote_momentum_biden: number
  vote_momentum_trump: number
  lead_change: boolean
  created_at: string
}

// Analytics view types
export interface NationalSummary {
  total_votes_national: number
  biden_total_votes: number
  trump_total_votes: number
  other_total_votes: number
  biden_national_percentage: number
  trump_national_percentage: number
  biden_states_won: number
  trump_states_won: number
  avg_margin_of_victory: number
}

export interface SwingState {
  name: string
  slug: string
  biden_final_percentage: number
  trump_final_percentage: number
  margin_of_victory: number
  winner: string
  total_votes_final: number
}

export interface VoteReportingTimeline {
  hour_bucket: string
  states_reporting: number
  votes_added_this_hour: number
  biden_votes_added: number
  trump_votes_added: number
  avg_biden_percentage: number
  avg_trump_percentage: number
}

export interface StatePerformanceMetrics {
  name: string
  slug: string
  total_updates: number
  first_report: string
  last_report: string
  reporting_duration: string
  final_vote_count: number
  biden_favorable_updates: number
  trump_favorable_updates: number
  largest_vote_dump: number
  largest_biden_dump: number
  largest_trump_dump: number
}

export interface ElectoralTimeline {
  name: string
  slug: string
  called_at: string
  biden_percentage: number
  trump_percentage: number
  margin_at_call: number
  projected_winner: string
}

export interface LeadChange {
  name: string
  slug: string
  timestamp_recorded: string
  biden_votes: number
  trump_votes: number
  biden_percentage: number
  trump_percentage: number
  total_votes_at_time: number
  prev_biden_leading: boolean
  biden_leading: boolean
  lead_changed: boolean
}