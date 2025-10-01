'use client'

import { useState, useEffect, useMemo } from 'react'
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
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

interface TimeseriesEntry {
  timestamp: string
  biden_votes: number
  trump_votes: number
  total_votes: number
  biden_percentage?: number
  trump_percentage?: number
  margin?: number
  leading_candidate?: string
}

interface AnalyticalData {
  timestamp: string
  biden_votes: number
  trump_votes: number
  total_votes: number
  biden_diff_prev: number
  trump_diff_prev: number
  total_diff_prev: number
  biden_diff_avg: number
  trump_diff_avg: number
  total_diff_avg: number
  biden_running_avg: number
  trump_running_avg: number
  total_running_avg: number
  biden_momentum: number
  trump_momentum: number
  biden_share: number
  trump_share: number
  margin: number
  volatility_index: number
  reporting_velocity: number
  lead_margin: number
  leading_candidate: string
}

interface TimeseriesData {
  state: string
  slug: string
  abbreviation: string
  electoral_votes: number
  data: TimeseriesEntry[]
  metadata: {
    winner_2020: string | null
    margin_2020: number | null
    swing_state: boolean
    total_records: number
  }
}

interface TimeseriesChartProps {
  state: string
}

export default function TimeseriesChartSimple({ state }: { state: string }) {
  const [timeseriesData, setTimeseriesData] = useState<TimeseriesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataPoints, setDataPoints] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [activeChart, setActiveChart] = useState<'basic' | 'diff-prev' | 'diff-avg' | 'diff-prev-sorted' | 'diff-avg-sorted' | 'running-avg' | 'vote-shares' | 'momentum' | 'volatility' | 'margin-analysis' | 'margin-analysis-sorted' | 'raw-table'>('basic')
  const [analyticalData, setAnalyticalData] = useState<AnalyticalData[]>([])

  useEffect(() => {
    if (!state) return
    loadTimeseriesData()
  }, [state])

  useEffect(() => {
    // Recalculate display data when dataPoints or activeChart changes
    // This ensures the chart updates properly when controls change
  }, [dataPoints, activeChart])

  const loadTimeseriesData = async () => {
    if (!state) return
    
    setLoading(true)
    setError(null)

    try {
      const stateParam = state.toLowerCase().replace(/\s+/g, '-')
      const response = await fetch(`/api/timeseries/${stateParam}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Timeseries data not found for ${state}`)
      }
      
      const data: TimeseriesData = await response.json()
      console.log('Loaded timeseries data:', data)
      setTimeseriesData(data)
      calculateAnalyticalData(data.data)
    } catch (error) {
      console.error('Error loading timeseries data:', error)
      setError(error instanceof Error ? error.message : 'Failed to load timeseries data')
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalyticalData = (data: TimeseriesEntry[]) => {
    if (!data || data.length === 0) return

    // Calculate averages
    const avgBiden = data.reduce((sum, entry) => sum + entry.biden_votes, 0) / data.length
    const avgTrump = data.reduce((sum, entry) => sum + entry.trump_votes, 0) / data.length
    const avgTotal = data.reduce((sum, entry) => sum + entry.total_votes, 0) / data.length

    const analytical: AnalyticalData[] = data.map((entry, index) => {
      const prevEntry = index > 0 ? data[index - 1] : entry
      const prev2Entry = index > 1 ? data[index - 2] : prevEntry
      
      // Calculate 5-period running averages
      const windowSize = Math.min(5, index + 1)
      const startIndex = Math.max(0, index - windowSize + 1)
      const window = data.slice(startIndex, index + 1)
      
      const biden_running_avg = window.reduce((sum, d) => sum + d.biden_votes, 0) / window.length
      const trump_running_avg = window.reduce((sum, d) => sum + d.trump_votes, 0) / window.length
      const total_running_avg = window.reduce((sum, d) => sum + d.total_votes, 0) / window.length
      
      // Calculate momentum (acceleration)
      const biden_prev_diff = entry.biden_votes - prevEntry.biden_votes
      const biden_prev2_diff = prevEntry.biden_votes - prev2Entry.biden_votes
      const biden_momentum = biden_prev_diff - biden_prev2_diff
      
      const trump_prev_diff = entry.trump_votes - prevEntry.trump_votes
      const trump_prev2_diff = prevEntry.trump_votes - prev2Entry.trump_votes
      const trump_momentum = trump_prev_diff - trump_prev2_diff
      
      // Calculate vote shares
      const biden_share = entry.total_votes > 0 ? (entry.biden_votes / entry.total_votes) * 100 : 0
      const trump_share = entry.total_votes > 0 ? (entry.trump_votes / entry.total_votes) * 100 : 0
      const margin = biden_share - trump_share
      
      // Calculate volatility index (standard deviation of recent changes)
      const recentChanges = window.slice(1).map((d, i) => d.total_votes - window[i].total_votes)
      const avgChange = recentChanges.length > 0 ? recentChanges.reduce((sum, change) => sum + change, 0) / recentChanges.length : 0
      const variance = recentChanges.length > 0 ? recentChanges.reduce((sum, change) => sum + Math.pow(change - avgChange, 2), 0) / recentChanges.length : 0
      const volatility_index = Math.sqrt(Math.max(0, variance)) // Ensure non-negative value for sqrt
      
      // Calculate reporting velocity (change in total votes)
      const reporting_velocity = entry.total_votes - prevEntry.total_votes
      
      // Calculate lead margin (difference between leading and second candidate)
      const lead_margin = Math.abs(entry.biden_votes - entry.trump_votes)
      const leading_candidate = entry.biden_votes > entry.trump_votes ? 'Biden' : 'Trump'
      
      return {
        timestamp: entry.timestamp,
        biden_votes: entry.biden_votes,
        trump_votes: entry.trump_votes,
        total_votes: entry.total_votes,
        biden_diff_prev: biden_prev_diff,
        trump_diff_prev: trump_prev_diff,
        total_diff_prev: entry.total_votes - prevEntry.total_votes,
        biden_diff_avg: entry.biden_votes - avgBiden,
        trump_diff_avg: entry.trump_votes - avgTrump,
        total_diff_avg: entry.total_votes - avgTotal,
        biden_running_avg,
        trump_running_avg,
        total_running_avg,
        biden_momentum,
        trump_momentum,
        biden_share,
        trump_share,
        margin,
        volatility_index,
        reporting_velocity,
        lead_margin,
        leading_candidate,
      }
    })

    setAnalyticalData(analytical)
  }



  // Calculate pagination info
  const totalPages = useMemo(() => {
    if (!analyticalData || analyticalData.length === 0) return 0
    return Math.ceil(analyticalData.length / dataPoints)
  }, [analyticalData, dataPoints])

  // Reset to page 0 when dataPoints or state changes
  useEffect(() => {
    setCurrentPage(0)
  }, [dataPoints, state])

  // Memoized calculations must be before conditional returns
  const displayData = useMemo(() => {
    if (!analyticalData || analyticalData.length === 0) return []
    
    // Calculate start and end indices for pagination
    const startIndex = currentPage * dataPoints
    const endIndex = startIndex + dataPoints
    const slicedData = analyticalData.slice(startIndex, endIndex)
    
    console.log(`[${timeseriesData?.state}] Page ${currentPage + 1}/${totalPages}: Displaying ${slicedData.length} data points (${startIndex}-${endIndex}) from ${analyticalData.length} total`)
    
    switch (activeChart) {
      case 'diff-prev-sorted':
        return [...slicedData].sort((a, b) => b.total_diff_prev - a.total_diff_prev)
      case 'diff-avg-sorted':
        return [...slicedData].sort((a, b) => b.total_diff_avg - a.total_diff_avg)
      case 'margin-analysis-sorted':
        return [...slicedData].sort((a, b) => Math.abs(b.margin) - Math.abs(a.margin))
      default:
        return slicedData
    }
  }, [analyticalData, dataPoints, currentPage, activeChart, timeseriesData?.state, totalPages])
  
  const chartData = useMemo(() => {
    if (!displayData || displayData.length === 0) return null

    const labels = displayData.map(entry => new Date(entry.timestamp))

    switch (activeChart) {
      case 'basic':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Votes',
              data: displayData.map(entry => entry.biden_votes),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump Votes',
              data: displayData.map(entry => entry.trump_votes),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
          ],
        }
      
      case 'diff-prev':
      case 'diff-prev-sorted':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Vote Change',
              data: displayData.map(entry => entry.biden_diff_prev),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump Vote Change',
              data: displayData.map(entry => entry.trump_diff_prev),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Total Vote Change',
              data: displayData.map(entry => entry.total_diff_prev),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.1,
            },
          ],
        }
      
      case 'diff-avg':
      case 'diff-avg-sorted':
        return {
          labels,
          datasets: [
            {
              label: 'Biden vs Average',
              data: displayData.map(entry => entry.biden_diff_avg),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump vs Average',
              data: displayData.map(entry => entry.trump_diff_avg),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Total vs Average',
              data: displayData.map(entry => entry.total_diff_avg),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.1,
            },
          ],
        }
      
      case 'running-avg':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Running Avg',
              data: displayData.map(entry => entry.biden_running_avg),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump Running Avg',
              data: displayData.map(entry => entry.trump_running_avg),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Biden Actual',
              data: displayData.map(entry => entry.biden_votes),
              borderColor: 'rgba(59, 130, 246, 0.4)',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderDash: [5, 5],
              tension: 0.1,
            },
            {
              label: 'Trump Actual',
              data: displayData.map(entry => entry.trump_votes),
              borderColor: 'rgba(239, 68, 68, 0.4)',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderDash: [5, 5],
              tension: 0.1,
            },
          ],
        }
      
      case 'vote-shares':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Share (%)',
              data: displayData.map(entry => entry.biden_share),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump Share (%)',
              data: displayData.map(entry => entry.trump_share),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Margin (Biden - Trump)',
              data: displayData.map(entry => entry.margin),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.1,
            },
          ],
        }
      
      case 'momentum':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Momentum',
              data: displayData.map(entry => entry.biden_momentum),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Trump Momentum',
              data: displayData.map(entry => entry.trump_momentum),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
            },
          ],
        }
      
      case 'volatility':
        return {
          labels,
          datasets: [
            {
              label: 'Volatility Index',
              data: displayData.map(entry => entry.volatility_index),
              borderColor: 'rgb(147, 51, 234)',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              tension: 0.1,
              yAxisID: 'y',
            },
            {
              label: 'Reporting Velocity',
              data: displayData.map(entry => entry.reporting_velocity),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.1,
              yAxisID: 'y1',
            },
          ],
        }
      
      case 'margin-analysis':
      case 'margin-analysis-sorted':
        return {
          labels,
          datasets: [
            {
              label: 'Biden Margin (+/-)',
              data: displayData.map(entry => entry.biden_votes > entry.trump_votes ? entry.lead_margin : -entry.lead_margin),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
              fill: false,
            },
            {
              label: 'Trump Margin (+/-)',
              data: displayData.map(entry => entry.trump_votes > entry.biden_votes ? entry.lead_margin : -entry.lead_margin),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
              fill: false,
            },
            {
              label: 'Zero Line (Tie)',
              data: displayData.map(() => 0),
              borderColor: 'rgb(107, 114, 128)',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 0,
              tension: 0.1,
              fill: false,
            },
          ],
        }
      
      default:
        return null
    }
  }, [displayData, activeChart])
  
  const statisticalInfo = useMemo(() => {
    if (!displayData || displayData.length < 2) return null

    const calculateStats = (values: number[]) => {
      const mean = values.reduce((sum, v) => sum + v, 0) / values.length
      const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
      const stdDev = Math.sqrt(variance)
      const min = Math.min(...values)
      const max = Math.max(...values)
      return { mean, stdDev, min, max, variance }
    }

    switch (activeChart) {
      case 'basic':
        const bidenStats = calculateStats(displayData.map(d => d.biden_votes))
        const trumpStats = calculateStats(displayData.map(d => d.trump_votes))
        return {
          type: 'Vote Distribution Analysis',
          insights: [
            `Biden vote range: ${bidenStats.min.toLocaleString()} - ${bidenStats.max.toLocaleString()}`,
            `Trump vote range: ${trumpStats.min.toLocaleString()} - ${trumpStats.max.toLocaleString()}`,
            `Biden std deviation: ${bidenStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Trump std deviation: ${trumpStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            bidenStats.stdDev > trumpStats.stdDev ? 'Biden votes show higher volatility' : 'Trump votes show higher volatility'
          ]
        }
      
      case 'diff-prev':
      case 'diff-prev-sorted':
        const prevDiffStats = calculateStats(displayData.map(d => d.total_diff_prev))
        const avgChange = prevDiffStats.mean
        return {
          type: 'Vote Change Pattern Analysis',
          insights: [
            `Average vote change per entry: ${avgChange.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Largest single increase: ${prevDiffStats.max.toLocaleString()}`,
            `Largest single decrease: ${prevDiffStats.min.toLocaleString()}`,
            `Change volatility (std dev): ${prevDiffStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            avgChange > 0 ? 'Overall upward trend in vote reporting' : 'Declining or stable vote pattern'
          ]
        }
      
      case 'diff-avg':
      case 'diff-avg-sorted':
        const avgDiffStats = calculateStats(displayData.map(d => d.total_diff_avg))
        return {
          type: 'Deviation from Average Analysis',
          insights: [
            `Mean deviation from average: ${avgDiffStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Highest above average: ${avgDiffStats.max.toLocaleString()}`,
            `Lowest below average: ${avgDiffStats.min.toLocaleString()}`,
            `Consistency (std dev): ${avgDiffStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            avgDiffStats.stdDev < avgDiffStats.mean * 0.5 ? 'Data shows consistent pattern' : 'Data shows high variability'
          ]
        }
      
      case 'running-avg':
        const bidenAvgStats = calculateStats(displayData.map(d => d.biden_running_avg))
        const trumpAvgStats = calculateStats(displayData.map(d => d.trump_running_avg))
        return {
          type: 'Running Average Trend Analysis',
          insights: [
            `Biden running average range: ${bidenAvgStats.min.toLocaleString()} - ${bidenAvgStats.max.toLocaleString()}`,
            `Trump running average range: ${trumpAvgStats.min.toLocaleString()} - ${trumpAvgStats.max.toLocaleString()}`,
            `Biden trend stability: ${bidenAvgStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Trump trend stability: ${trumpAvgStats.stdDev.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            bidenAvgStats.stdDev < trumpAvgStats.stdDev ? 'Biden shows more consistent reporting' : 'Trump shows more consistent reporting'
          ]
        }
      
      case 'vote-shares':
        const marginStats = calculateStats(displayData.map(d => d.margin))
        const bidenShareStats = calculateStats(displayData.map(d => d.biden_share))
        const trumpShareStats = calculateStats(displayData.map(d => d.trump_share))
        return {
          type: 'Vote Share Dynamics',
          insights: [
            `Biden share range: ${bidenShareStats.min.toFixed(1)}% - ${bidenShareStats.max.toFixed(1)}%`,
            `Trump share range: ${trumpShareStats.min.toFixed(1)}% - ${trumpShareStats.max.toFixed(1)}%`,
            `Average margin: ${marginStats.mean.toFixed(1)}% (${marginStats.mean > 0 ? 'Biden leads' : 'Trump leads'})`,
            `Margin volatility: ${marginStats.stdDev.toFixed(1)} percentage points`,
            Math.abs(marginStats.mean) > 5 ? 'Decisive lead maintained' : 'Competitive race with narrow margins'
          ]
        }
      
      case 'momentum':
        const bidenMomentumStats = calculateStats(displayData.map(d => d.biden_momentum))
        const trumpMomentumStats = calculateStats(displayData.map(d => d.trump_momentum))
        return {
          type: 'Momentum Analysis (Vote Acceleration)',
          insights: [
            `Biden momentum range: ${bidenMomentumStats.min.toLocaleString()} - ${bidenMomentumStats.max.toLocaleString()}`,
            `Trump momentum range: ${trumpMomentumStats.min.toLocaleString()} - ${trumpMomentumStats.max.toLocaleString()}`,
            `Biden avg acceleration: ${bidenMomentumStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Trump avg acceleration: ${trumpMomentumStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            bidenMomentumStats.mean > trumpMomentumStats.mean ? 'Biden shows stronger momentum' : 'Trump shows stronger momentum'
          ]
        }
      
      case 'volatility':
        const volatilityStats = calculateStats(displayData.map(d => d.volatility_index))
        const velocityStats = calculateStats(displayData.map(d => d.reporting_velocity))
        return {
          type: 'Reporting Volatility & Velocity Analysis',
          insights: [
            `Average volatility index: ${volatilityStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Peak volatility: ${volatilityStats.max.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
            `Average reporting velocity: ${velocityStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})} votes/entry`,
            `Peak reporting velocity: ${velocityStats.max.toLocaleString()} votes/entry`,
            volatilityStats.mean > velocityStats.stdDev ? 'High volatility in reporting patterns' : 'Stable reporting patterns'
          ]
        }
      
      case 'margin-analysis':
      case 'margin-analysis-sorted':
        const marginData = displayData.map(d => d.biden_votes > d.trump_votes ? d.lead_margin : -d.lead_margin)
        const marginAnalysisStats = calculateStats(marginData.map(Math.abs))
        const bidenLeadCount = displayData.filter(d => d.biden_votes > d.trump_votes).length
        const trumpLeadCount = displayData.filter(d => d.trump_votes > d.biden_votes).length
        return {
          type: 'Candidate Margin Analysis (+/-)',
          insights: [
            `Biden leads in ${bidenLeadCount} of ${displayData.length} entries (${(bidenLeadCount/displayData.length*100).toFixed(1)}%)`,
            `Trump leads in ${trumpLeadCount} of ${displayData.length} entries (${(trumpLeadCount/displayData.length*100).toFixed(1)}%)`,
            `Average margin magnitude: ${marginAnalysisStats.mean.toLocaleString(undefined, {maximumFractionDigits: 0})} votes`,
            `Largest margin: ${marginAnalysisStats.max.toLocaleString()} votes`,
            `Smallest margin: ${marginAnalysisStats.min.toLocaleString()} votes`,
            marginAnalysisStats.stdDev > marginAnalysisStats.mean * 0.5 ? 'Highly variable margins throughout' : 'Relatively consistent margin patterns'
          ]
        }
      
      default:
        return null
    }
  }, [displayData, activeChart])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: (() => {
          const stateName = timeseriesData?.state || state
          switch (activeChart) {
            case 'basic':
              return [`📊 Basic Vote Count - ${stateName}`, '📈 Shows absolute vote counts for Biden and Trump over time. Track cumulative vote reporting as results come in.']
            case 'diff-prev':
              return [`📈 Vote Changes Analysis - ${stateName}`, '🔄 Shows vote increases/decreases from previous entry. Identifies reporting surges and patterns.']
            case 'diff-avg':
              return [`📊 Deviation from Average - ${stateName}`, '📐 Shows how each entry compares to the overall average. Highlights above/below average periods.']
            case 'diff-prev-sorted':
              return [`📈 Vote Changes (Sorted) - ${stateName}`, '🔄 Same as Vote Changes but sorted by magnitude. Shows largest reporting jumps first.']
            case 'diff-avg-sorted':
              return [`📊 Deviation from Average (Sorted) - ${stateName}`, '📐 Same as deviation analysis but sorted by magnitude. Identifies biggest outliers first.']
            case 'running-avg':
              return [`📈 5-Period Running Averages - ${stateName}`, '📊 Smoothed trends with 5-entry moving averages. Dotted lines show actual data, solid lines show trends.']
            case 'vote-shares':
              return [`📊 Vote Share Percentages - ${stateName}`, '📈 Shows Biden/Trump percentages and margin over time. Green line shows lead margin (Biden% - Trump%).']
            case 'momentum':
              return [`⚡ Momentum Analysis - ${stateName}`, '🚀 Shows vote acceleration patterns. Positive = gaining speed, negative = slowing down in vote reporting.']
            case 'volatility':
              return [`📈 Volatility & Velocity Analysis - ${stateName}`, '📊 Purple = reporting volatility (consistency), Green = reporting velocity (speed). Dual y-axis chart.']
            case 'margin-analysis':
              return [`📊 Candidate Margin Analysis - ${stateName}`, '🎯 Shows +/- margins for each candidate. Positive = leading, negative = behind. Zero line = tie.']
            case 'margin-analysis-sorted':
              return [`📊 Margin Analysis (Sorted) - ${stateName}`, '🎯 Same margin data sorted by magnitude. Shows largest leads first, helps identify most competitive periods.']
            default:
              return [`📊 Election Data - ${stateName}`, 'Comprehensive election data visualization']
          }
        })(),
      },
    },
    scales: {
      x: {
        type: activeChart.includes('sorted') ? 'category' as const : 'time' as const,
        ...(activeChart.includes('sorted') ? {} : {
          time: {
            displayFormats: {
              hour: 'MMM dd HH:mm',
              day: 'MMM dd',
            },
          },
        }),
        title: {
          display: true,
          text: activeChart.includes('sorted') ? 'Data Points (Sorted)' : 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: (() => {
            switch (activeChart) {
              case 'basic':
                return 'Vote Count'
              case 'diff-prev':
              case 'diff-prev-sorted':
                return 'Vote Change'
              case 'diff-avg':
              case 'diff-avg-sorted':
                return 'Difference from Average'
              case 'running-avg':
                return 'Vote Count (Running Average)'
              case 'vote-shares':
                return 'Percentage (%)'
              case 'momentum':
                return 'Momentum (Vote Acceleration)'
              case 'volatility':
                return 'Volatility Index'
              case 'margin-analysis':
              case 'margin-analysis-sorted':
                return 'Margin (+/- Votes)'
              default:
                return 'Value'
            }
          })(),
        },
        ticks: {
          callback: function(value: any) {
            return typeof value === 'number' ? value.toLocaleString() : value
          }
        },
        ...(activeChart === 'volatility' && {
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            title: {
              display: true,
              text: 'Reporting Velocity (votes/entry)',
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function(value: any) {
                return typeof value === 'number' ? value.toLocaleString() : value
              }
            }
          }
        })
      },
      ...(activeChart === 'volatility' ? {
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Reporting Velocity (votes)',
          },
          ticks: {
            callback: function(value: any) {
              return typeof value === 'number' ? value.toLocaleString() : value
            }
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      } : {}),
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <div className="ml-4 text-gray-600">Loading timeseries data for {state}...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!timeseriesData || !timeseriesData.data || timeseriesData.data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">No Data Available</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>No timeseries data found for {state}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const saveEnhancedChart = async () => {
    if (!timeseriesData || !chartData) return

    try {
      const response = await fetch('/api/charts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: timeseriesData.state,
          chart_type: activeChart,
          data_points: dataPoints,
          chart_data: {
            labels: chartData.labels,  
            datasets: chartData.datasets,
            display_data: displayData
          },
          statistical_analysis: statisticalInfo,
          timestamp: new Date().toISOString()
        })
      })

      const result = await response.json()

      if (result.success) {
        alert(`Enhanced chart saved successfully for ${timeseriesData.state}!`)
      } else {
        alert('Failed to save enhanced chart: ' + result.error)
      }
    } catch (error) {
      console.error('Error saving enhanced chart:', error)
      alert('Error saving enhanced chart. Please try again.')
    }
  }





  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enhanced Election Analytics - {timeseriesData.state}
        </h2>
        <p className="text-gray-600">
          Advanced statistical analysis of vote progression ({timeseriesData.data.length} total data points)
        </p>
      </div>

      {/* Chart Description */}
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-800">
          {(() => {
            switch (activeChart) {
              case 'basic':
                return '📈 Shows absolute vote counts for Biden and Trump over time. Track cumulative vote reporting as results come in.'
              case 'diff-prev':
                return '🔄 Shows vote increases/decreases from previous entry. Identifies reporting surges and patterns.'
              case 'diff-avg':
                return '📊 Shows how each entry compares to the overall average. Highlights above/below average periods.'
              case 'diff-prev-sorted':
                return '🔄 Same as Vote Changes but sorted by magnitude. Shows largest reporting jumps first.'
              case 'diff-avg-sorted':
                return '📊 Same as deviation analysis but sorted by magnitude. Identifies biggest outliers first.'
              case 'running-avg':
                return '📈 Smoothed trends with 5-entry moving averages. Dotted lines show actual data, solid lines show trends.'
              case 'vote-shares':
                return '📈 Shows Biden/Trump percentages and margin over time. Green line shows lead margin (Biden% - Trump%).'
              case 'momentum':
                return '🚀 Shows vote acceleration patterns. Positive = gaining speed, negative = slowing down in vote reporting.'
              case 'volatility':
                return '📈 Purple = reporting volatility (consistency), Green = reporting velocity (speed). Dual y-axis chart.'
              case 'margin-analysis':
                return '🎯 Shows +/- margins for each candidate. Positive = leading, negative = behind. Zero line = tie.'
              case 'margin-analysis-sorted':
                return '🎯 Same margin data sorted by magnitude. Shows largest leads first, helps identify most competitive periods.'
              default:
                return 'Comprehensive election data visualization with advanced analytics.'
            }
          })()
          }
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Data Points Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Points to Display
            </label>
            <select
              value={dataPoints}
              onChange={(e) => {
                const newValue = Number(e.target.value)
                console.log(`[${timeseriesData?.state}] Data points changed from ${dataPoints} to ${newValue}`)
                setDataPoints(newValue)
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={10}>10 entries</option>
              <option value={20}>20 entries</option>  
              <option value={30}>30 entries</option>
              <option value={40}>40 entries</option>
              <option value={50}>50 entries</option>
            </select>
          </div>

          {/* Chart Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Type
            </label>
            <select
              value={activeChart}
              onChange={(e) => {
                const newValue = e.target.value as any
                console.log(`[${timeseriesData?.state}] Chart type changed from ${activeChart} to ${newValue}`)
                setActiveChart(newValue)
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="basic">Basic Vote Count</option>
              <option value="diff-prev">Difference from Previous</option>
              <option value="diff-avg">Difference from Average</option>
              <option value="diff-prev-sorted">Difference from Previous (Sorted)</option>
              <option value="diff-avg-sorted">Difference from Average (Sorted)</option>
              <option value="running-avg">Running Averages (5-period)</option>
              <option value="vote-shares">Vote Share Percentages</option>
              <option value="momentum">Momentum (Acceleration)</option>
              <option value="volatility">Volatility Index</option>
              <option value="margin-analysis">Margin Analysis (+/-)</option>
              <option value="margin-analysis-sorted">Margin Analysis (Sorted)</option>
              <option value="raw-table">Raw Vote Data Table</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Next →
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage + 1}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)) - 1
                  setCurrentPage(page)
                }}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-600">of {totalPages}</span>
            </div>
            <span className="text-sm text-gray-500">
              Showing {displayData.length} of {analyticalData.length} entries
            </span>
            <span className="text-xs text-gray-400 ml-2">
              (Chart: {chartData ? '✓' : '✗'})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Date Range Indicator */}
      {displayData.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="text-blue-800">
              <span className="font-medium">Time Range:</span> {' '}
              {new Date(displayData[0].timestamp).toLocaleString()} 
              {' → '}
              {new Date(displayData[displayData.length - 1].timestamp).toLocaleString()}
            </div>
            <div className="text-blue-600">
              {displayData.length} entries on page {currentPage + 1}
            </div>
          </div>
        </div>
      )}

      {/* Chart Description */}
      {chartData && (
        <div className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
            {(() => {
              switch (activeChart) {
                case 'basic':
                  return '📊 Basic Vote Count Analysis'
                case 'diff-prev':
                case 'diff-prev-sorted':
                  return '📈 Vote Change Pattern Analysis'
                case 'diff-avg':
                case 'diff-avg-sorted':
                  return '📊 Deviation from Average Analysis'
                case 'running-avg':
                  return '📈 Running Average Trend Analysis'
                case 'vote-shares':
                  return '📊 Vote Share Dynamics'
                case 'momentum':
                  return '⚡ Momentum Analysis (Vote Acceleration)'
                case 'volatility':
                  return '📈 Reporting Volatility & Velocity Analysis'
                case 'margin-analysis':
                case 'margin-analysis-sorted':
                  return '📊 Candidate Margin Analysis (+/-)'
                case 'raw-table':
                  return '📋 Raw Vote Data Table'
                default:
                  return '📊 Election Data Analysis'
              }
            })()
          }
          </h3>
          <div className="space-y-2">
            <p className="text-indigo-800 text-sm">
              {(() => {
                switch (activeChart) {
                  case 'basic':
                    return '🔵 Biden votes (blue) and 🔴 Trump votes (red) over time. Shows raw vote counts as they were reported.'
                  case 'diff-prev':
                    return '📈 Shows vote changes from the previous entry. Positive values indicate increases, negative values show decreases.'
                  case 'diff-prev-sorted':
                    return '📊 Same as vote changes, but sorted by total change magnitude to highlight periods of highest activity.'
                  case 'diff-avg':
                    return '📊 Shows how each entry differs from the overall average. Helps identify above/below average reporting periods.'
                  case 'diff-avg-sorted':
                    return '📈 Deviations from average, sorted by magnitude to show the most significant variations first.'
                  case 'running-avg':
                    return '📈 5-period moving averages (solid lines) with actual data (dashed lines). Smooths out short-term fluctuations to reveal trends.'
                  case 'vote-shares':
                    return '📊 Biden share % (blue), Trump share % (red), and margin (green). Shows competitive dynamics as percentages.'
                  case 'momentum':
                    return '⚡ Vote acceleration - positive values show increasing pace, negative values show slowing. Reveals campaign momentum.'
                  case 'volatility':
                    return '📈 Dual y-axis: Volatility Index (purple) measures reporting consistency, Reporting Velocity (green) shows pace of new votes.'
                  case 'margin-analysis':
                    return '📊 Positive values = candidate is leading, negative = behind, zero line = tie. Shows lead magnitude over time.'
                  case 'margin-analysis-sorted':
                    return '📈 Same margin data but sorted by magnitude to see periods of largest and smallest leads first.'
                  case 'raw-table':
                    return '📋 Complete tabular view of all vote data with timestamps, totals, and calculated metrics. Perfect for detailed analysis and data verification.'
                  default:
                    return 'Advanced statistical analysis of presidential election vote reporting patterns.'
                }
              })()
            }
            </p>
            
            {/* Analytical Purpose & Value */}
            <div className="bg-indigo-100/50 p-3 rounded text-sm text-indigo-900">
              <strong>🎯 Why This Chart Matters:</strong> {(() => {
                switch (activeChart) {
                  case 'basic':
                    return 'The Basic Vote Count chart provides the fundamental view of election progress, showing the raw cumulative totals that determine the winner. Essential for understanding the overall scale and progression of vote counting, revealing the timing and pace of result reporting.'
                  
                  case 'diff-prev':
                    return 'Vote Changes Analysis reveals the rhythm of election reporting by showing surges, lulls, and patterns in how votes are counted and reported. Critical for identifying when major vote batches were processed and understanding reporting methodology.'
                  
                  case 'diff-prev-sorted':
                    return 'The sorted version prioritizes the most significant reporting events, making it easy to spot the largest vote dumps and most active counting periods. Perfect for quickly identifying the key moments that shaped the election timeline.'
                  
                  case 'diff-avg':
                    return 'Deviation from Average Analysis helps normalize the data to identify unusually high or low reporting periods relative to the overall pattern. Valuable for spotting anomalies, peak activity periods, and understanding typical vs. exceptional reporting behavior.'
                  
                  case 'diff-avg-sorted':
                    return 'By sorting deviations by magnitude, this chart immediately highlights the most unusual reporting periods - both above and below average. Essential for quality control and identifying periods that warrant closer examination.'
                  
                  case 'running-avg':
                    return 'Running Averages smooth out short-term noise to reveal underlying trends and patterns in vote reporting. The combination of trend lines with actual data provides both the big picture and granular detail, perfect for understanding momentum shifts over time.'
                  
                  case 'vote-shares':
                    return 'Vote Share Analysis transforms raw numbers into competitive context, showing the race dynamics as percentages. This chart reveals how close or decisive the race is at any point, making it easy to understand competitiveness regardless of total vote scale.'
                  
                  case 'momentum':
                    return 'Momentum Analysis reveals the acceleration and deceleration of vote reporting, showing which candidate is gaining or losing steam. This advanced metric helps identify campaign momentum, reporting pace changes, and critical inflection points in the race.'
                  
                  case 'volatility':
                    return 'Volatility & Velocity Analysis provides dual insights into reporting consistency and speed. The volatility index shows how erratic or stable the reporting is, while velocity shows the pace - together revealing the quality and tempo of election administration.'
                  
                  case 'margin-analysis':
                    return 'The Margin Analysis charts provide a much more intuitive way to understand the competitive dynamics, showing not just who\'s leading but by how much, and how those margins change over time. The visual representation makes lead changes and competitiveness immediately apparent.'
                  
                  case 'margin-analysis-sorted':
                    return 'The sorted version helps identify the most competitive periods by organizing data by margin size! This makes it easy to spot the tightest races and largest leads, perfect for understanding when the election was most and least competitive.'
                  
                  case 'raw-table':
                    return 'The Raw Vote Data Table provides the most comprehensive view of election data, showing every metric in a structured format. Essential for data verification, detailed analysis, and when you need to see exact numbers, timestamps, and calculated values. Perfect for researchers, analysts, and anyone who needs to examine the data in detail or export specific values.'
                  
                  default:
                    return 'This advanced analytical view provides deep insights into election data patterns, helping understand the complex dynamics of vote reporting and competitive positioning throughout the election timeline.'
                }
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Chart or Table Display */}
      {activeChart === 'raw-table' ? (
        <div className="mb-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biden Votes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trump Votes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Votes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biden %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trump %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leader</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Margin</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.map((entry, index) => {
                    const entryNumber = currentPage * dataPoints + index + 1
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{entryNumber}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(entry.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-mono">
                          {entry.biden_votes.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-mono">
                          {entry.trump_votes.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {entry.total_votes.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-mono">
                          {entry.biden_share.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-mono">
                          {entry.trump_share.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                          <span className={entry.margin > 0 ? 'text-blue-600' : entry.margin < 0 ? 'text-red-600' : 'text-gray-500'}>
                            {entry.margin > 0 ? '+' : ''}{entry.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            entry.leading_candidate === 'Biden' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {entry.leading_candidate}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {entry.lead_margin.toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Table Summary */}
            <div className="bg-gray-50 px-4 py-3 border-t">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Entries:</span>
                  <span className="ml-2 text-gray-900">{displayData.length} shown</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Latest Total:</span>
                  <span className="ml-2 text-gray-900 font-mono">
                    {displayData.length > 0 ? displayData[displayData.length - 1].total_votes.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current Leader:</span>
                  <span className="ml-2 text-gray-900">
                    {displayData.length > 0 ? displayData[displayData.length - 1].leading_candidate : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current Margin:</span>
                  <span className="ml-2 text-gray-900 font-mono">
                    {displayData.length > 0 ? `${displayData[displayData.length - 1].lead_margin.toLocaleString()} votes` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 mb-6">
          {chartData ? (
            <Line 
              key={`${activeChart}-${dataPoints}-${currentPage}-${timeseriesData?.state}`}
              data={chartData} 
              options={chartOptions} 
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500">No chart data available</p>
                <p className="text-sm text-gray-400 mt-1">Chart data: {chartData ? 'Available' : 'Not available'}</p>
                <p className="text-sm text-gray-400">Display data: {displayData?.length || 0} entries</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistical Significance */}
      {statisticalInfo && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📊 {statisticalInfo.type}
          </h3>
          <ul className="space-y-2">
            {statisticalInfo.insights.map((insight, index) => (
              <li key={index} className="text-blue-800 flex items-start">
                <span className="mr-2">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Narrative Data Insights */}
      {displayData.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            📊 Data Story & Insights
          </h3>
          <div className="text-purple-800 space-y-2">
            {(() => {
              const latest = displayData[displayData.length - 1]
              const earliest = displayData[0]
              const midpoint = displayData[Math.floor(displayData.length / 2)]
              
              const bidenGrowth = latest.biden_votes - earliest.biden_votes
              const trumpGrowth = latest.trump_votes - earliest.trump_votes
              const totalGrowth = latest.total_votes - earliest.total_votes
              
              const bidenGrowthRate = earliest.biden_votes > 0 ? ((bidenGrowth / earliest.biden_votes) * 100) : 0
              const trumpGrowthRate = earliest.trump_votes > 0 ? ((trumpGrowth / earliest.trump_votes) * 100) : 0
              
              const currentMargin = latest.biden_share - latest.trump_share
              const earlyMargin = earliest.biden_share - earliest.trump_share
              const marginTrend = currentMargin - earlyMargin
              
              // Calculate momentum trend
              const recentData = displayData.slice(-Math.min(5, displayData.length))
              const avgRecentBidenMomentum = recentData.reduce((sum, d) => sum + d.biden_momentum, 0) / recentData.length
              const avgRecentTrumpMomentum = recentData.reduce((sum, d) => sum + d.trump_momentum, 0) / recentData.length
              
              return [
                `📈 Vote Reporting Journey: ${totalGrowth.toLocaleString()} total votes reported across ${displayData.length} data points`,
                `🏆 Leading Candidate: ${latest.biden_votes > latest.trump_votes ? 'Biden' : 'Trump'} (${Math.abs(currentMargin).toFixed(1)}% margin)`,
                `📊 Growth Rates: Biden +${bidenGrowthRate.toFixed(1)}%, Trump +${trumpGrowthRate.toFixed(1)}%`,
                `🎯 Margin Trend: ${marginTrend > 0 ? 'Biden gaining' : marginTrend < 0 ? 'Trump gaining' : 'Stable'} (${marginTrend > 0 ? '+' : ''}${marginTrend.toFixed(1)}% change)`,
                `⚡ Recent Momentum: ${avgRecentBidenMomentum > avgRecentTrumpMomentum ? 'Biden' : 'Trump'} shows stronger acceleration in recent reporting`,
                `🔍 Key Insight: ${Math.abs(currentMargin) > 5 ? 'Decisive lead established' : Math.abs(currentMargin) < 1 ? 'Extremely tight race' : 'Competitive but clear leader'}`
              ]
            })().map((insight, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2 text-purple-600">•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Margin Analysis Summary */}
      {displayData.length > 0 && (activeChart === 'margin-analysis' || activeChart === 'margin-analysis-sorted') && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            📊 Margin Analysis Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <span className="font-medium text-gray-700">Average Margin:</span>
              <span className="ml-2 text-gray-900 font-mono">
                {(displayData.reduce((sum, d) => sum + d.lead_margin, 0) / displayData.length).toLocaleString(undefined, {maximumFractionDigits: 0})} votes
              </span>
            </div>
            <div className="bg-white p-3 rounded border">
              <span className="font-medium text-gray-700">Largest Margin:</span>
              <span className="ml-2 text-gray-900 font-mono">
                {Math.max(...displayData.map(d => d.lead_margin)).toLocaleString()} votes
              </span>
            </div>
            <div className="bg-white p-3 rounded border">
              <span className="font-medium text-gray-700">Closest Race:</span>
              <span className="ml-2 text-gray-900 font-mono">
                {Math.min(...displayData.map(d => d.lead_margin)).toLocaleString()} votes
              </span>
            </div>
          </div>
          <div className="mt-3 text-green-800">
            <strong>Chart Interpretation:</strong> Positive values show when that candidate is leading, negative values show when they're behind. The zero line represents a tie.
          </div>
        </div>
      )}

      {/* Save Chart Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={saveEnhancedChart}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Save Enhanced Chart</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div className="bg-blue-50 p-3 rounded">
          <div className="font-semibold text-blue-700">Latest Total</div>
          <div className="text-blue-900">
            {displayData.length > 0 ? displayData[displayData.length - 1].total_votes.toLocaleString() : 'N/A'}
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="font-semibold text-blue-700">Biden Latest</div>
          <div className="text-blue-900">
            {displayData.length > 0 ? displayData[displayData.length - 1].biden_votes.toLocaleString() : 'N/A'}
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded">
          <div className="font-semibold text-red-700">Trump Latest</div>
          <div className="text-red-900">
            {displayData.length > 0 ? displayData[displayData.length - 1].trump_votes.toLocaleString() : 'N/A'}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="font-semibold text-gray-700">Showing Points</div>
          <div className="text-gray-900">
            {(() => {
              const startIndex = currentPage * dataPoints + 1
              const endIndex = Math.min(startIndex + displayData.length - 1, timeseriesData.data.length)
              return `${startIndex}-${endIndex} of ${timeseriesData.data.length}`
            })()} 
          </div>
        </div>
      </div>

      {/* Metadata */}
      {timeseriesData.metadata && displayData.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">State Election Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Current Leader:</span>
              <span className="ml-2 text-gray-900">
                {displayData[displayData.length - 1].biden_votes > displayData[displayData.length - 1].trump_votes 
                 ? 'Biden' : 'Trump'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Current Margin:</span>
              <span className="ml-2 text-gray-900">
                {`${Math.abs((displayData[displayData.length - 1].biden_votes - displayData[displayData.length - 1].trump_votes) / displayData[displayData.length - 1].total_votes * 100).toFixed(2)}%`}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Swing State:</span>
              <span className="ml-2 text-gray-900">{timeseriesData.metadata?.swing_state ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}