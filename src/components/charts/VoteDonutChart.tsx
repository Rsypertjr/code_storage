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
  showAllStates?: boolean
}

export default function VoteDonutChart({ data, viewType = 'state', showAllStates = false }: VoteDonutChartProps) {
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
    // Expanded color palette for all 50 states with distinct, vibrant colors
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16', 
      '#6366f1', '#ec4899', '#14b8a6', '#f43f5e', '#a855f7', '#22c55e', '#eab308', '#0ea5e9',
      '#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#84cc16',
      '#6366f1', '#ec4899', '#14b8a6', '#f43f5e', '#a855f7', '#22c55e', '#eab308', '#0ea5e9',
      '#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#fb7185', '#60a5fa', '#4ade80', '#fcd34d',
      '#c084fc', '#2dd4bf', '#fb923c', '#818cf8', '#f87171', '#38bdf8', '#4ade80', '#facc15',
      '#e879f9', '#06b6d4', '#fb7185', '#a3a3a3'
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
  } : viewType === 'national' && isNationalData(data) ? (() => {
    // Show top 15 states by default, or all states if showAllStates is true
    const statesToShow = showAllStates ? data.states : data.states.slice(0, 15)
    const remainingStates = showAllStates ? [] : data.states.slice(15)
    const remainingVotes = remainingStates.reduce((sum, state) => sum + state.percentageOfNation, 0)
    
    const labels = [...statesToShow.map(state => state.state)]
    const chartData = [...statesToShow.map(state => state.percentageOfNation)]
    const colors = [...statesToShow.map((_, index) => getStateColor(index))]
    
    // Add "Other States" category if not showing all states
    if (!showAllStates && remainingVotes > 0) {
      labels.push(`Other States (${remainingStates.length})`)
      chartData.push(remainingVotes)
      colors.push('#9ca3af')
    }
    
    return {
      labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    }
  })() : isStateData(data) ? {
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
          padding: viewType === 'national' ? 8 : 20,
          usePointStyle: true,
          boxWidth: viewType === 'national' ? 8 : 12,
          font: {
            size: viewType === 'national' ? 10 : 12,
          },
        },
        maxHeight: viewType === 'national' ? 200 : undefined,
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
              const statesToShow = showAllStates ? data.states : data.states.slice(0, 15)
              const remainingStates = showAllStates ? [] : data.states.slice(15)
              
              if (context.dataIndex < statesToShow.length) {
                const state = statesToShow[context.dataIndex]
                return [
                  `${state.state}: ${state.percentageOfNation.toFixed(2)}%`,
                  `Votes: ${state.totalVotes.toLocaleString()}`
                ]
              } else if (!showAllStates && remainingStates.length > 0) {
                const totalRemainingVotes = remainingStates.reduce((sum, state) => sum + state.totalVotes, 0)
                const totalRemainingPercentage = remainingStates.reduce((sum, state) => sum + state.percentageOfNation, 0)
                return [
                  `Other ${remainingStates.length} States: ${totalRemainingPercentage.toFixed(2)}%`,
                  `Total Votes: ${totalRemainingVotes.toLocaleString()}`,
                  `States: ${remainingStates.map(s => s.state).join(', ')}`
                ]
              }
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
              <div className="text-xl font-bold text-gray-700">
                {data.totalNationalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total National Votes</div>
              <div className="text-sm text-gray-500">
                {data.states.length} Available
              </div>
              <div className="text-xs text-gray-400">
                (of 51 total)
              </div>
              {data.states.length > 0 && (
                <div className="text-xs text-gray-400 mt-1">
                  Largest: {data.states[0]?.state}
                </div>
              )}
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