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
import { StateData, ElectionData } from '@/types/election'

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
  rawData?: ElectionData
}

export default function VoteLineChart({ data, rawData }: VoteLineChartProps) {
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

  // Process timeseries data into 10 averaged intervals
  const processTimeseriesData = () => {
    const timeseries = rawData?.data?.races?.[0]?.timeseries
    
    if (!timeseries || timeseries.length === 0) {
      // Fallback to simulated data if no timeseries available
      return {
        labels: ['Early Votes', 'Election Day', 'Final Count'],
        datasets: data.candidates.map((candidate) => ({
          label: candidate.name,
          data: [
            candidate.percentage * 0.85,
            candidate.percentage * 0.95,
            candidate.percentage
          ],
          borderColor: getPartyColor(candidate.party),
          backgroundColor: `${getPartyColor(candidate.party)}20`,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
        }))
      }
    }

    // Filter out entries without timestamps and sort by timestamp
    const validEntries = timeseries
      .filter(entry => entry.timestamp && entry.vote_shares)
      .sort((a, b) => new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime())

    if (validEntries.length === 0) {
      return { labels: [], datasets: [] }
    }

    // Create 10 intervals across the date range
    const firstTimestamp = new Date(validEntries[0].timestamp!)
    const lastTimestamp = new Date(validEntries[validEntries.length - 1].timestamp!)
    const totalTimeSpan = lastTimestamp.getTime() - firstTimestamp.getTime()
    const intervalDuration = totalTimeSpan / 10

    interface IntervalData {
      start: Date
      end: Date
      entries: typeof validEntries
    }

    const intervals: IntervalData[] = []
    const labels: string[] = []

    for (let i = 0; i < 10; i++) {
      const intervalStart = new Date(firstTimestamp.getTime() + (i * intervalDuration))
      const intervalEnd = new Date(firstTimestamp.getTime() + ((i + 1) * intervalDuration))
      
      // Find all entries within this interval
      const intervalEntries = validEntries.filter(entry => {
        const entryTime = new Date(entry.timestamp!).getTime()
        return entryTime >= intervalStart.getTime() && entryTime < intervalEnd.getTime()
      })

      // If no entries in this interval, use the closest previous entry
      if (intervalEntries.length === 0 && i > 0) {
        intervalEntries.push(intervals[i - 1].entries[intervals[i - 1].entries.length - 1])
      }

      intervals.push({
        start: intervalStart,
        end: intervalEnd,
        entries: intervalEntries
      })

      // Create label showing the end date/time of the interval
      labels.push(intervalEnd.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }

    // Calculate averaged data for each candidate across intervals
    const candidateNames = ['bidenj', 'trumpd']
    const candidateLabels = ['Biden', 'Trump']
    const candidateParties = ['democrat', 'republican']

    const datasets = candidateNames.map((candidateKey, index) => {
      const intervalAverages = intervals.map(interval => {
        if (interval.entries.length === 0) return 0
        
        const validShares = interval.entries
          .map((entry: typeof validEntries[0]) => entry.vote_shares?.[candidateKey] || 0)
          .filter((share: number) => share > 0)
        
        if (validShares.length === 0) return 0
        
        const average = validShares.reduce((sum: number, share: number) => sum + share, 0) / validShares.length
        return average * 100 // Convert to percentage
      })

      return {
        label: candidateLabels[index],
        data: intervalAverages,
        borderColor: getPartyColor(candidateParties[index]),
        backgroundColor: `${getPartyColor(candidateParties[index])}20`,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      }
    })

    return { labels, datasets }
  }

  const chartData = processTimeseriesData()

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
        text: `${data.state} - Vote Trends (10 Interval Average)`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
          },
          title: (tooltipItems: any) => {
            return `Interval ${tooltipItems[0].dataIndex + 1}: ${tooltipItems[0].label}`
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date Intervals (End Time)'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Vote Share Percentage (%)'
        },
        min: 0,
        max: 100,
      },
    },
  }

  return (
    <div className="h-96">
      <Line data={chartData} options={options} />
    </div>
  )
}