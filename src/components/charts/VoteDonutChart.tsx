'use client'

import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { StateData } from '@/types/election'

ChartJS.register(ArcElement, Tooltip, Legend)

interface VoteDonutChartProps {
  data: StateData
}

export default function VoteDonutChart({ data }: VoteDonutChartProps) {
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

  const chartData = {
    labels: data.candidates.map(candidate => candidate.name),
    datasets: [
      {
        data: data.candidates.map(candidate => candidate.percentage),
        backgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party)),
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
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
        },
      },
      title: {
        display: true,
        text: `${data.state} - Vote Percentage`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const candidate = data.candidates[context.dataIndex]
            return [
              `${candidate.name}: ${candidate.percentage.toFixed(1)}%`,
              `Votes: ${candidate.votes.toLocaleString()}`
            ]
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
          <div className="text-2xl font-bold text-gray-700">
            {data.totalVotes.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Votes</div>
          <div className="text-sm text-gray-500">
            {data.reportingPercentage.toFixed(1)}% Reporting
          </div>
        </div>
      </div>
    </div>
  )
}