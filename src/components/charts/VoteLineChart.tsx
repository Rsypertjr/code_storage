'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { StateData } from '@/types/election'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface VoteLineChartProps {
  data: StateData
}

export default function VoteLineChart({ data }: VoteLineChartProps) {
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

  // Create trend data (for demonstration, we'll use current percentages as trend points)
  const timeLabels = ['Early Votes', 'Election Day', 'Final Count']
  
  const chartData = {
    labels: timeLabels,
    datasets: data.candidates.map((candidate, index) => ({
      label: candidate.name,
      data: [
        // Simulate trend data - in real implementation, this would come from historical data
        candidate.percentage * 0.85, // Early votes
        candidate.percentage * 0.95, // Election day
        candidate.percentage // Final count
      ],
      borderColor: getPartyColor(candidate.party),
      backgroundColor: `${getPartyColor(candidate.party)}20`,
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
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
        text: `${data.state} - Vote Trends`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Reporting Timeline'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Vote Percentage (%)'
        },
        min: 0,
        max: Math.max(...data.candidates.map(c => c.percentage)) * 1.1,
      },
    },
  }

  return (
    <div className="h-96">
      <Line data={chartData} options={options} />
    </div>
  )
}