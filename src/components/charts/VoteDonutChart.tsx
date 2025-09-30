'use client'

import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { StateData, NationalData, StateVsNationData } from '@/types/election'

ChartJS.register(ArcElement, Tooltip, Legend)

interface VoteDonutChartProps {
  data: StateData | NationalData | StateVsNationData
  viewType?: 'state' | 'national' | 'state-vs-nation'
}

export default function VoteDonutChart({ data, viewType = 'state' }: VoteDonutChartProps) {
  const getPartyColor = (party: string) => {
    switch (party.toLowerCase()) {
      case 'dem':
      case 'democrat':
        return '#3b82f6'
      case 'rep':
      case 'republican':
        return '#ef4444'
      default:
        return '#64748b'
    }
  }

  const getStateColor = (index: number) => {
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#ec4899',
      '#14b8a6', '#f43f5e', '#a855f7', '#22c55e', '#eab308',
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'
    ]
    return colors[index % colors.length]
  }

  // Type guards
  const isStateData = (data: StateData | NationalData | StateVsNationData): data is StateData => {
    return 'candidates' in data
  }

  const isNationalData = (data: StateData | NationalData | StateVsNationData): data is NationalData => {
    return 'states' in data
  }

  const isStateVsNationData = (data: StateData | NationalData | StateVsNationData): data is StateVsNationData => {
    return 'selectedState' in data && 'otherStates' in data
  }

  const chartData = viewType === 'state-vs-nation' && isStateVsNationData(data) ? {
    labels: [data.selectedState.name, 'All Other States'],
    datasets: [
      {
        data: [data.selectedState.percentageOfNation, data.otherStates.percentageOfNation],
        backgroundColor: ['#3b82f6', '#e5e7eb'],
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  } : viewType === 'national' && isNationalData(data) ? {
    labels: data.states.map(state => state.state),
    datasets: [
      {
        data: data.states.map(state => state.percentageOfNation),
        backgroundColor: data.states.map((_, index) => getStateColor(index)),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  } : isStateData(data) ? {
    labels: data.candidates.map(candidate => candidate.name),
    datasets: [
      {
        data: data.candidates.map(candidate => candidate.percentage),
        backgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party)),
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  } : {
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: '#ffffff', borderWidth: 3 }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: viewType === 'state-vs-nation' && isStateVsNationData(data)
          ? `${data.selectedState.name} vs All Other States`
          : viewType === 'national' && isNationalData(data) 
          ? 'States as Percentage of National Vote Total'
          : isStateData(data) 
          ? `${data.state} - Vote Percentage`
          : 'Vote Distribution',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (viewType === 'state-vs-nation' && isStateVsNationData(data)) {
              if (context.dataIndex === 0) {
                return [
                  `${data.selectedState.name}: ${data.selectedState.percentageOfNation.toFixed(2)}%`,
                  `Votes: ${data.selectedState.totalVotes.toLocaleString()}`
                ]
              } else {
                return [
                  `All Other States: ${data.otherStates.percentageOfNation.toFixed(2)}%`,
                  `Votes: ${data.otherStates.totalVotes.toLocaleString()}`
                ]
              }
            } else if (viewType === 'national' && isNationalData(data)) {
              const state = data.states[context.dataIndex]
              return [
                `${state.state}: ${state.percentageOfNation.toFixed(2)}%`,
                `Votes: ${state.totalVotes.toLocaleString()}`
              ]
            } else if (isStateData(data)) {
              const candidate = data.candidates[context.dataIndex]
              return [
                `${candidate.name}: ${candidate.percentage.toFixed(1)}%`,
                `Votes: ${candidate.votes.toLocaleString()}`
              ]
            }
            return []
          }
        }
      }
    },
  }

  return (
    <div className="h-96 relative">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {viewType === 'state-vs-nation' && isStateVsNationData(data) ? (
            <>
              <div className="text-2xl font-bold text-blue-600">
                {data.selectedState.percentageOfNation.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">of National Total</div>
              <div className="text-sm text-gray-600">
                {data.selectedState.totalVotes.toLocaleString()} votes
              </div>
            </>
          ) : viewType === 'national' && isNationalData(data) ? (
            <>
              <div className="text-2xl font-bold text-gray-700">
                {data.totalNationalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total National Votes</div>
              <div className="text-sm text-gray-500">
                {data.states.length} States
              </div>
            </>
          ) : isStateData(data) ? (
            <>
              <div className="text-2xl font-bold text-gray-700">
                {data.totalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Votes</div>
              <div className="text-sm text-gray-500">
                {data.reportingPercentage.toFixed(1)}% Reporting
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">No Data Available</div>
          )}
        </div>
      </div>
    </div>
  )
}