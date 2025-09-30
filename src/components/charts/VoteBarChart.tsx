'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { StateData } from '@/types/election'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface VoteBarChartProps {
  data: StateData
}

export default function VoteBarChart({ data }: VoteBarChartProps) {
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
        label: 'Votes',
        data: data.candidates.map(candidate => candidate.votes),
        backgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party)),
        borderColor: data.candidates.map(candidate => getPartyColor(candidate.party)),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${data.state} - Vote Count`,
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
              `Percentage: ${candidate.percentage.toFixed(1)}%`,
              `Party: ${candidate.party}`
            ]
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: any) {
            return typeof tickValue === 'number' ? tickValue.toLocaleString() : tickValue
          }
        }
      },
    },
  }

  return (
    <div className="h-96">
      <Bar data={chartData} options={options} />
    </div>
  )
}