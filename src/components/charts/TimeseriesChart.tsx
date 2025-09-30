'use client'

import { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

interface TimeseriesEntry {
  index: number
  votes: number
  timestamp: string
  bidenj: number
  biden_votes: number
  trumpd: number
  trump_votes: number
  other_votes: number
  total_vote_add: number
  total_vote_add_trump: number
  total_vote_add_biden: number
  total_vote_add_other: number
  total_vote_add_total: number
  percent_of_remaining_trump: number
  percent_of_remaining_biden: number
  time: string
}

interface TimeseriesData {
  state: string
  data: TimeseriesEntry[]
  metadata: {
    total_votes_final: number
    biden_final_votes: number
    trump_final_votes: number
    other_final_votes: number
    generated_at: string
  }
}

interface TimeseriesChartProps {
  state: string
}

export default function TimeseriesChart({ state }: TimeseriesChartProps) {
  const [timeseriesData, setTimeseriesData] = useState<TimeseriesData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [chartView, setChartView] = useState<'cumulative' | 'spikes' | 'deviation' | 'spikes-sorted' | 'deviation-sorted'>('cumulative')

  useEffect(() => {
    loadTimeseriesData()
  }, [state])

  useEffect(() => {
    // Reset to first page when changing items per page
    setCurrentPage(0)
  }, [itemsPerPage])

  const loadTimeseriesData = async () => {
    setLoading(true)
    setError(null)
    setCurrentPage(0)

    try {
      // Try to load from the server db folder via API
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `${state.toLowerCase()}-timeseries-${timestamp}.json`
      
      const response = await fetch(`/api/db/${filename}`)
      if (!response.ok) {
        throw new Error(`Timeseries data not found for ${state}`)
      }
      
      const data: TimeseriesData = await response.json()
      setTimeseriesData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load timeseries data')
      setTimeseriesData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading timeseries data...</span>
        </div>
      </div>
    )
  }

  if (error || !timeseriesData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center text-red-600">
          <p>{error || 'No timeseries data available'}</p>
          <button
            onClick={loadTimeseriesData}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const totalEntries = timeseriesData.data.length
  const totalPages = Math.ceil(totalEntries / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries)
  const currentData = timeseriesData.data.slice(startIndex, endIndex)

  // Calculate deviation data for deviation views
  const deviationData = (chartView === 'deviation' || chartView === 'deviation-sorted') ? currentData.map((entry, index) => {
    const candidateIncreases = [entry.total_vote_add_biden, entry.total_vote_add_trump, entry.total_vote_add_other]
    const average = candidateIncreases.reduce((sum, val) => sum + val, 0) / candidateIncreases.length
    return {
      originalIndex: index,
      entry,
      average,
      bidenDeviation: entry.total_vote_add_biden - average,
      trumpDeviation: entry.total_vote_add_trump - average,
      otherDeviation: entry.total_vote_add_other - average,
    }
  }) : []

  // Create sorted data for sorted views
  const sortedSpikeData = chartView === 'spikes-sorted' ? 
    currentData.map((entry, index) => ({ originalIndex: index, entry }))
      .sort((a, b) => b.entry.total_vote_add - a.entry.total_vote_add) : []

  const sortedDeviationData = chartView === 'deviation-sorted' ? 
    [...deviationData].sort((a, b) => {
      // Sort by absolute deviation magnitude (Biden deviation as primary sort)
      return Math.abs(b.bidenDeviation) - Math.abs(a.bidenDeviation)
    }) : []

  // Prepare chart data based on view type
  const getChartData = () => {
    if (chartView === 'cumulative') {
      const labels = currentData.map(entry => new Date(entry.timestamp))
      return {
        labels,
        datasets: [
          {
            label: 'Total Votes',
            data: currentData.map(entry => entry.votes),
            borderColor: '#3b82f6',
            backgroundColor: chartType === 'bar' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.1)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 4 : 0,
            pointHoverRadius: chartType === 'line' ? 6 : 0,
            tension: chartType === 'line' ? 0.4 : 0,
          },
          {
            label: 'Biden Votes',
            data: currentData.map(entry => entry.biden_votes),
            borderColor: '#1d4ed8',
            backgroundColor: chartType === 'bar' ? 'rgba(29, 78, 216, 0.6)' : 'rgba(29, 78, 216, 0.1)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.4 : 0,
          },
          {
            label: 'Trump Votes',
            data: currentData.map(entry => entry.trump_votes),
            borderColor: '#ef4444',
            backgroundColor: chartType === 'bar' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.1)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.4 : 0,
          },
          {
            label: 'Other Votes',
            data: currentData.map(entry => entry.other_votes),
            borderColor: '#64748b',
            backgroundColor: chartType === 'bar' ? 'rgba(100, 116, 139, 0.6)' : 'rgba(100, 116, 139, 0.1)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.4 : 0,
          },
        ],
      }
    } else if (chartView === 'spikes') {
      return {
        labels,
        datasets: [
          {
            label: 'Biden Vote Increases',
            data: currentData.map(entry => entry.total_vote_add_biden),
            borderColor: '#1d4ed8',
            backgroundColor: chartType === 'bar' ? 'rgba(29, 78, 216, 0.6)' : 'rgba(29, 78, 216, 0.2)',
            borderWidth: chartType === 'line' ? 3 : 1,
            pointRadius: chartType === 'line' ? 4 : 0,
            pointHoverRadius: chartType === 'line' ? 6 : 0,
            tension: chartType === 'line' ? 0.1 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Trump Vote Increases',
            data: currentData.map(entry => entry.total_vote_add_trump),
            borderColor: '#ef4444',
            backgroundColor: chartType === 'bar' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.2)',
            borderWidth: chartType === 'line' ? 3 : 1,
            pointRadius: chartType === 'line' ? 4 : 0,
            pointHoverRadius: chartType === 'line' ? 6 : 0,
            tension: chartType === 'line' ? 0.1 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Other Vote Increases',
            data: currentData.map(entry => entry.total_vote_add_other),
            borderColor: '#64748b',
            backgroundColor: chartType === 'bar' ? 'rgba(100, 116, 139, 0.6)' : 'rgba(100, 116, 139, 0.2)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.1 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Total Vote Increases',
            data: currentData.map(entry => entry.total_vote_add),
            borderColor: '#3b82f6',
            backgroundColor: chartType === 'bar' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.2)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.1 : 0,
            fill: chartType === 'line' ? false : true,
            borderDash: [5, 5], // Dashed line to distinguish total
          },
        ],
      }
    } else {
      // Deviation view
      return {
        labels,
        datasets: [
          {
            label: 'Biden Deviation from Average',
            data: deviationData.map(d => d.bidenDeviation),
            borderColor: '#1d4ed8',
            backgroundColor: chartType === 'bar' ? 'rgba(29, 78, 216, 0.6)' : 'rgba(29, 78, 216, 0.2)',
            borderWidth: chartType === 'line' ? 3 : 1,
            pointRadius: chartType === 'line' ? 4 : 0,
            pointHoverRadius: chartType === 'line' ? 6 : 0,
            tension: chartType === 'line' ? 0.3 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Trump Deviation from Average',
            data: deviationData.map(d => d.trumpDeviation),
            borderColor: '#ef4444',
            backgroundColor: chartType === 'bar' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.2)',
            borderWidth: chartType === 'line' ? 3 : 1,
            pointRadius: chartType === 'line' ? 4 : 0,
            pointHoverRadius: chartType === 'line' ? 6 : 0,
            tension: chartType === 'line' ? 0.3 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Other Deviation from Average',
            data: deviationData.map(d => d.otherDeviation),
            borderColor: '#64748b',
            backgroundColor: chartType === 'bar' ? 'rgba(100, 116, 139, 0.6)' : 'rgba(100, 116, 139, 0.2)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 3 : 0,
            pointHoverRadius: chartType === 'line' ? 5 : 0,
            tension: chartType === 'line' ? 0.3 : 0,
            fill: chartType === 'line' ? false : true,
          },
          {
            label: 'Average Vote Increases',
            data: deviationData.map(d => d.average),
            borderColor: '#10b981',
            backgroundColor: chartType === 'bar' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.2)',
            borderWidth: chartType === 'line' ? 2 : 1,
            pointRadius: chartType === 'line' ? 2 : 0,
            pointHoverRadius: chartType === 'line' ? 4 : 0,
            tension: chartType === 'line' ? 0.3 : 0,
            fill: chartType === 'line' ? false : true,
            borderDash: [3, 3], // Dashed line for reference
          },
          {
            label: 'Zero Line (Reference)',
            data: deviationData.map(() => 0),
            borderColor: '#6b7280',
            backgroundColor: 'transparent',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 0,
            tension: 0,
            fill: false,
            borderDash: [8, 4], // Dashed reference line
          },
        ],
      }
    }
  }

  const chartData = getChartData()

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${timeseriesData.state} - ${chartView === 'cumulative' ? 'Vote Progress' : chartView === 'spikes' ? 'Vote Increases/Spikes' : 'Deviation from Average'} (Entries ${startIndex + 1}-${endIndex} of ${totalEntries})`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const dataIndex = context[0].dataIndex
            const entry = currentData[dataIndex]
            
            if (chartView === 'cumulative') {
              return [
                '',
                `Vote Additions:`,
                `  Biden: +${entry.total_vote_add_biden.toLocaleString()}`,
                `  Trump: +${entry.total_vote_add_trump.toLocaleString()}`,
                `  Other: +${entry.total_vote_add_other.toLocaleString()}`,
                `  Total: +${entry.total_vote_add.toLocaleString()}`,
                '',
                `Percentages:`,
                `  Biden: ${(entry.bidenj * 100).toFixed(1)}%`,
                `  Trump: ${(entry.trumpd * 100).toFixed(1)}%`,
              ]
            } else if (chartView === 'spikes') {
              return [
                '',
                `Cumulative Totals:`,
                `  Biden: ${entry.biden_votes.toLocaleString()}`,
                `  Trump: ${entry.trump_votes.toLocaleString()}`,
                `  Other: ${entry.other_votes.toLocaleString()}`,
                `  Total: ${entry.votes.toLocaleString()}`,
                '',
                `Percentages of Increase:`,
                `  Biden: ${(entry.bidenj * 100).toFixed(1)}%`,
                `  Trump: ${(entry.trumpd * 100).toFixed(1)}%`,
              ]
            } else {
              // Deviation view
              const deviationEntry = deviationData[dataIndex]
              return [
                '',
                `Vote Increases:`,
                `  Biden: +${entry.total_vote_add_biden.toLocaleString()}`,
                `  Trump: +${entry.total_vote_add_trump.toLocaleString()}`,
                `  Other: +${entry.total_vote_add_other.toLocaleString()}`,
                `  Average: ${deviationEntry.average.toLocaleString()}`,
                '',
                `Deviations from Average:`,
                `  Biden: ${deviationEntry.bidenDeviation >= 0 ? '+' : ''}${deviationEntry.bidenDeviation.toLocaleString()}`,
                `  Trump: ${deviationEntry.trumpDeviation >= 0 ? '+' : ''}${deviationEntry.trumpDeviation.toLocaleString()}`,
                `  Other: ${deviationEntry.otherDeviation >= 0 ? '+' : ''}${deviationEntry.otherDeviation.toLocaleString()}`,
              ]
            }
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time' as const,
        display: true,
        title: {
          display: true,
          text: 'Time of Vote'
        },
        time: {
          displayFormats: {
            hour: 'MMM dd, HH:mm',
            minute: 'HH:mm',
            second: 'HH:mm:ss'
          },
          tooltipFormat: 'MMM dd, yyyy HH:mm:ss'
        },
        ticks: {
          maxTicksLimit: currentData.length,
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: chartView === 'cumulative' ? 'Vote Count' : chartView === 'spikes' ? 'Vote Increases' : 'Deviation from Average'
        },
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: any) {
            return typeof tickValue === 'number' ? tickValue.toLocaleString() : tickValue
          }
        }
      },
    },
  }

  const options = chartType === 'bar' ? {
    ...baseOptions,
    indexAxis: 'x' as const,
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales.x,
        categoryPercentage: 0.9,
        barPercentage: 0.8,
      }
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 2,
      }
    }
  } : baseOptions

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Timeseries Vote Progress</h2>
        
        {/* Chart Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Chart Type:</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as 'line' | 'bar')}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Chart View:</label>
            <select
              value={chartView}
              onChange={(e) => setChartView(e.target.value as 'cumulative' | 'spikes' | 'deviation')}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cumulative">Cumulative Totals</option>
              <option value="spikes">Vote Increases/Spikes</option>
              <option value="deviation">Deviation from Average</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Entries per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                const newItemsPerPage = parseInt(e.target.value)
                setItemsPerPage(newItemsPerPage)
              }}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>{size} entries</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <span className="text-sm text-gray-600">
              Showing entries {startIndex + 1}-{endIndex} of {totalEntries}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        {/* Quick Jump */}
        <div className="flex items-center gap-2 text-sm">
          <span>Jump to page:</span>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytical Explanation for Spikes View */}
      {chartView === 'spikes' && (
        <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">📊 Vote Increases/Spikes Analysis</h3>
          <p className="text-sm text-blue-700 mb-2">
            This view shows vote additions at each time interval, perfect for analytical insights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-blue-600">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">🔍</span>
              <div>
                <strong>Detecting Vote Batch Uploads:</strong> Large spikes in specific time periods indicate when vote batches were processed
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">📈</span>
              <div>
                <strong>Analyzing Voting Patterns:</strong> Identify when votes were processed in batches vs. continuous streams
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">⚡</span>
              <div>
                <strong>Comparing Candidate Momentum:</strong> See which candidate gained votes at specific moments in time
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">🚨</span>
              <div>
                <strong>Identifying Anomalies:</strong> Spot unusual vote addition patterns that may warrant further investigation
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytical Explanation for Deviation View */}
      {chartView === 'deviation' && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">📊 Deviation from Average Analysis</h3>
          <p className="text-sm text-green-700 mb-2">
            This view shows how each candidate's vote increases differ from the average, helping identify performance patterns:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-green-600">
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold">📊</span>
              <div>
                <strong>Above/Below Average Performance:</strong> Positive values show above-average gains, negative show below-average
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold">⚖️</span>
              <div>
                <strong>Comparative Analysis:</strong> Easily compare which candidate consistently performs above or below the norm
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold">🎯</span>
              <div>
                <strong>Pattern Recognition:</strong> Identify periods where candidates over/under-performed relative to typical patterns
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold">🔄</span>
              <div>
                <strong>Trend Analysis:</strong> Spot shifts in voting momentum by tracking deviations over time
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-96 mb-4">
        {chartType === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div className="bg-blue-50 p-3 rounded">
          <div className="font-semibold text-blue-700">Final Total</div>
          <div className="text-blue-900">{timeseriesData.metadata.total_votes_final.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="font-semibold text-blue-700">Biden Final</div>
          <div className="text-blue-900">{timeseriesData.metadata.biden_final_votes.toLocaleString()}</div>
        </div>
        <div className="bg-red-50 p-3 rounded">
          <div className="font-semibold text-red-700">Trump Final</div>
          <div className="text-red-900">{timeseriesData.metadata.trump_final_votes.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="font-semibold text-gray-700">Other Final</div>
          <div className="text-gray-900">{timeseriesData.metadata.other_final_votes.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}