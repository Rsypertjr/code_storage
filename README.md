# President Votes - 2020 Election Data Visualization

A Next.js application that displays interactive charts showing 2020 presidential election data by state using Chart.js.

## Features

- **State Selection**: Choose from all 50 US states to view their election data
- **Multiple Chart Types**: 
  - Bar Chart: Vote counts for each candidate
  - Pie Chart: Vote share distribution
  - Donut Chart: Vote percentages with total vote count
  - Line Chart: Vote trends over time
- **Analytics Dashboard**: Comprehensive election analytics including swing states, national summaries, and state performance metrics
- **Data Processing**: All data is stored and served from Supabase PostgreSQL database
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly interface
- **Real-time Data**: All election data served from Supabase database with fast queries

## Data Source

Election data is stored in Supabase PostgreSQL database with the following structure:
- **states**: Basic state information (name, slug, abbreviation, electoral votes)
- **state_metadata**: Election results and metadata (winner, margin, swing state status)
- **timeseries_data**: Historical vote count data over time

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Chart.js** - Chart rendering
- **react-chartjs-2** - React wrapper for Chart.js
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── save-timeseries/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── StateSelector.tsx
│   ├── TimeseriesGenerator.tsx
│   └── charts/
│       ├── VoteBarChart.tsx
│       ├── VotePieChart.tsx
│       ├── VoteDonutChart.tsx
│       └── VoteLineChart.tsx
├── types/
│   └── election.ts
└── utils/
    ├── timeseriesProcessor.ts
    └── processedStatesManager.ts
db/
├── .gitkeep
└── [generated JSON files]
scripts/
└── generate-timeseries.js
```

## Component Architecture

### Chart Components
Each chart type is implemented as a dedicated component:

- **VoteBarChart**: Displays vote counts as vertical bars
- **VotePieChart**: Shows vote share as pie slices
- **VoteDonutChart**: Presents percentages in donut format with center statistics
- **VoteLineChart**: Illustrates vote trends over reporting timeline

### Data Processing
The application automatically:
- Fetches election data for the selected state
- Identifies the top 2 candidates by vote count
- Groups remaining candidates as "Other"
- Calculates percentages and totals
- Applies party-based color coding (Blue for Democrat, Red for Republican, Gray for Others)

## Usage

### Using the Application

1. Open the application in your browser at http://localhost:3001
2. Select a state from the dropdown menu (states are loaded from Supabase database)
3. View the timeseries chart showing vote progression over time
4. Explore the analytics dashboard with various metrics and insights

### Analytics Features

The application provides comprehensive analytics including:
- **National Summary**: Overall election statistics
- **Swing States**: States with close margins and their electoral impact
- **State Performance**: Voting patterns and turnout metrics
- **Electoral Timeline**: Timeline of key electoral events
- **Vote Momentum**: Analysis of vote changes over time

### Data Structure

The application uses Supabase PostgreSQL with the following schema:

```sql
-- States table
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  abbreviation VARCHAR(2) NOT NULL,
  electoral_votes INTEGER NOT NULL
);

-- State metadata for election results
CREATE TABLE state_metadata (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id),
  winner_2020 VARCHAR,
  margin_2020 DECIMAL,
  swing_state BOOLEAN DEFAULT false
);

-- Timeseries voting data
CREATE TABLE timeseries_data (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id),
  timestamp TIMESTAMP NOT NULL,
  biden_votes INTEGER DEFAULT 0,
  trump_votes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  reporting_percent DECIMAL DEFAULT 0
);
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-timeseries` - Generate timeseries JSON files for all states

## License

This project is for educational and demonstration purposes.