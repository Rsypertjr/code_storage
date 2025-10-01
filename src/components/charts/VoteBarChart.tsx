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
  const getPartyColor = (party: string, isBackground = true) => {
    switch (party.toLowerCase()) {
      case 'dem':
      case 'democrat':
        return isBackground ? '#3b82f6' : '#1e40af'
      case 'rep':
      case 'republican':
        return isBackground ? '#ef4444' : '#dc2626'
      default:
        return isBackground ? '#64748b' : '#374151'
    }
  }

  const getPartyGradient = (party: string) => {
    switch (party.toLowerCase()) {
      case 'dem':
      case 'democrat':
        return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
      case 'rep':
      case 'republican':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
      default:
        return 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
    }
  }

  const chartData = {
    labels: data.candidates.map(candidate => candidate.name),
    datasets: [
      {
        label: 'Votes',
        data: data.candidates.map(candidate => candidate.votes),
        backgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party, true)),
        borderColor: data.candidates.map(candidate => getPartyColor(candidate.party, false)),
        borderWidth: 2,
        hoverBackgroundColor: data.candidates.map(candidate => getPartyColor(candidate.party, false)),
        hoverBorderColor: data.candidates.map(candidate => getPartyColor(candidate.party, false)),
        hoverBorderWidth: 3,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rect',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          generateLabels: (chart: any) => {
            return data.candidates.map((candidate, index) => ({
              text: `${candidate.name} (${candidate.percentage.toFixed(1)}%)`,
              fillStyle: getPartyColor(candidate.party, true),
              strokeStyle: getPartyColor(candidate.party, false),
              lineWidth: 2,
              pointStyle: 'rect' as const,
              datasetIndex: 0,
              index: index
            }))
          }
        },
      },
      title: {
        display: true,
        text: `${data.state} - Vote Distribution`,
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#1f2937'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (tooltipItems: any) => {
            const candidate = data.candidates[tooltipItems[0].dataIndex]
            return `${candidate.name} (${candidate.party.toUpperCase()})`
          },
          label: (context: any) => {
            const candidate = data.candidates[context.dataIndex]
            return [
              `Votes: ${candidate.votes.toLocaleString()}`,
              `Share: ${candidate.percentage.toFixed(1)}%`,
              `Total Votes: ${data.totalVotes.toLocaleString()}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          color: '#374151',
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.3)',
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
          callback: function(tickValue: any) {
            if (typeof tickValue === 'number') {
              if (tickValue >= 1000000) {
                return (tickValue / 1000000).toFixed(1) + 'M'
              } else if (tickValue >= 1000) {
                return (tickValue / 1000).toFixed(0) + 'K'
              }
              return tickValue.toLocaleString()
            }
            return tickValue
          }
        },
        title: {
          display: true,
          text: 'Vote Count',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          color: '#374151'
        }
      },
    },
  }

  return (
    <div className="h-[450px] w-full">
      <Bar data={chartData} options={options} />
      
      {/* Additional Stats Panel */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-gray-700">Total Votes</div>
          <div className="text-lg font-bold text-gray-900">{data.totalVotes.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-gray-700">Reporting</div>
          <div className="text-lg font-bold text-gray-900">{data.reportingPercentage.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}