'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { StateData } from '@/types/election'

ChartJS.register(ArcElement, Tooltip, Legend)

interface VotePieChartProps {
  data: StateData
}

export default function VotePieChart({ data }: VotePieChartProps) {
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
    labels: data.candidates.map(candidate => `${candidate.name} (${candidate.party})`),
    datasets: [
      {
        data: data.candidates.map(candidate => candidate.votes),
        backgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party)),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: `${data.state} - Vote Share`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const candidate = data.candidates[context.dataIndex]
            return [
              `${candidate.name}: ${candidate.votes.toLocaleString()} votes`,
              `Percentage: ${candidate.percentage.toFixed(1)}%`
            ]
          }
        }
      }
    },
  }

  return (
    <div className="h-96">
      <Pie data={chartData} options={options} />
    </div>
  )
}