# Supabase Migration Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (this takes a few minutes)
3. Go to Settings > API to get your project URL and API keys

## Step 2: Configure Environment Variables

Update your `.env.local` file with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Set up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the script to create all tables, views, and functions

## Step 4: Migrate Data

Run the migration script to transfer your JSON data to Supabase:

```bash
node migrate-to-supabase.js
```

## Step 5: Test the Application

The app now includes three main views:

### 1. State Charts Tab
- Original functionality with pie charts, donut charts, and line charts
- Shows individual state election data
- Timeseries generator for data collection

### 2. National View Tab  
- Overview of all 50 states + DC
- National donut chart with vote distribution
- State-by-state breakdown

### 3. Analytics Dashboard Tab (NEW)
- **National Summary**: Total votes, percentages, states won
- **Swing States**: Closest races with margins under 3%
- **Largest Vote Batches**: States with biggest single vote updates
- Advanced analytics powered by Supabase queries

## Key Features Added

### Advanced Analytics Views
- `national_summary`: Real-time national vote totals and percentages  
- `swing_states`: Competitive races with small margins
- `vote_reporting_timeline`: Hourly vote reporting patterns
- `state_performance_metrics`: Vote dump analysis and reporting statistics
- `electoral_timeline`: When states were "called" based on vote patterns
- `lead_changes`: Track when candidates exchanged leads

### Complex Query Capabilities
- **Cross-state analysis**: Compare trends across multiple states
- **Time-series analytics**: PostgreSQL's built-in time-series functions
- **Window functions**: Running totals, moving averages, percentage changes
- **Aggregations**: Nationwide totals, averages, statistical analysis
- **Performance metrics**: Vote dump sizes, reporting patterns, momentum analysis

### API Endpoints
- `/api/analytics/national-summary` - Overall election summary
- `/api/analytics/swing-states` - Closest competitive races
- `/api/analytics/reporting-timeline` - Vote reporting by hour
- `/api/analytics/state-performance` - State-level reporting metrics  
- `/api/analytics/electoral-timeline` - State call timeline
- `/api/analytics/lead-changes` - Leadership changes over time
- `/api/analytics/vote-momentum` - Recent vote trends by state

### Database Functions
- `get_vote_momentum(state_slug, hours_back)` - Recent vote trends
- `get_safe_states(min_lead_percentage)` - States with secure leads

## Benefits Achieved

1. **Scalability**: Database can handle complex queries across all states simultaneously
2. **Performance**: Indexed queries, server-side filtering, efficient pagination
3. **Analytics Power**: Complex aggregations, statistical analysis, trend detection
4. **Data Integrity**: Foreign key constraints, type safety, validation
5. **Advanced Insights**: Lead changes, vote momentum, competitive analysis, reporting patterns

The migration provides a robust foundation for advanced election data analysis while maintaining all existing functionality.