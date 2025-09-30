# President Votes - 2020 Election Data Visualization

A Next.js application that displays interactive charts showing 2020 presidential election data by state using Chart.js.

## Features

- **State Selection**: Choose from all 50 US states to view their election data
- **Multiple Chart Types**: 
  - Bar Chart: Vote counts for each candidate
  - Pie Chart: Vote share distribution
  - Donut Chart: Vote percentages with total vote count
  - Line Chart: Vote trends over time
- **Timeseries Data Generator**: Extract and process timeseries voting data into JSON format
- **Data Processing**: Automatically groups candidates into top 2 and "Other" category
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly interface
- **Real-time Data**: Fetches data from New York Times election API
- **Batch Processing**: Generate JSON files for multiple states at once

## Data Source

Election data is sourced from:
```
https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/{state}/president.json
```

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

1. Select a state from the dropdown menu
2. View the election data across four different chart visualizations
3. Hover over chart elements for detailed information
4. Charts automatically update when changing states

## Timeseries Data Generation

### Using the Web Interface
1. Click "Show Timeseries Generator" button on the main page
2. View the progress summary showing processed vs remaining states
3. Select the states you want to process (or use "Select All States")
4. States with green checkmarks have already been processed
5. Click "Generate Selected States" to download and save JSON files
6. Files are automatically saved to the `db` folder on the server
7. Processed states are automatically tracked and persist between sessions

### Using the Command Line
Generate timeseries data for all states:
```bash
npm run generate-timeseries
```

This will create files in the `db` directory with:
- Individual JSON files for each state
- A combined file with all states' data
- A `processed-states.json` file tracking which states have been completed

### JSON Structure
Each timeseries entry contains:
```json
{
  "index": 0,
  "votes": 100000,
  "timestamp": "2020-11-03T23:00:00Z",
  "bidenj": 0.61,
  "biden_votes": 61000,
  "trumpd": 0.34,
  "trump_votes": 34000,
  "other_votes": 5000,
  "total_vote_add": 0,
  "total_vote_add_trump": 0,
  "total_vote_add_biden": 0,
  "total_vote_add_other": 0,
  "total_vote_add_total": 0,
  "percent_of_remaining_trump": 72.5,
  "percent_of_remaining_biden": 26.8,
  "time": "2020-11-03T23:00:00Z"
}
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-timeseries` - Generate timeseries JSON files for all states

## License

This project is for educational and demonstration purposes.