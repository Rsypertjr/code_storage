'use client'

import { useState, useEffect } from 'react'
import StateSelector from '@/components/StateSelector'
import VoteBarChart from '@/components/charts/VoteBarChart'
import VotePieChart from '@/components/charts/VotePieChart'
import VoteDonutChart from '@/components/charts/VoteDonutChart'
import VoteLineChart from '@/components/charts/VoteLineChart'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import TimeseriesGenerator from '@/components/TimeseriesGenerator'
import { ElectionData, StateData, NationalData, StateVsNationData } from '@/types/election'
import { getProcessedStates } from '@/utils/processedStatesManager'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New-Hampshire',
  'New-Jersey', 'New-Mexico', 'New-York', 'North-Carolina', 'North-Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode-Island', 'South-Carolina', 'South-Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West-Virginia',
  'Wisconsin', 'Wyoming'
]

export default function Home() {
  const [selectedState, setSelectedState] = useState<string>('California')
  const [electionData, setElectionData] = useState<ElectionData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showTimeseriesGenerator, setShowTimeseriesGenerator] = useState<boolean>(false)
  const [processedStates, setProcessedStates] = useState<string[]>([])
  const [showTimeseriesMessage, setShowTimeseriesMessage] = useState<boolean>(false)
  const [showNationalView, setShowNationalView] = useState<boolean>(false)
  const [nationalData, setNationalData] = useState<NationalData | null>(null)
  const [loadingNational, setLoadingNational] = useState<boolean>(false)
  const [stateVsNationData, setStateVsNationData] = useState<StateVsNationData | null>(null)

  const fetchElectionData = async (state: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.toLowerCase().replace(/\-/g, '')}/president.json`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${state}`)
      }
      
      const data = await response.json()
      setElectionData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      setElectionData(null)
    } finally {
      setLoading(false)
    }
  }

  // Load processed states on component mount and fetch national data for comparisons
  useEffect(() => {
    const savedStates = getProcessedStates()
    setProcessedStates(savedStates)
    // Automatically load national data for state comparisons
    fetchNationalData()
  }, [])

  // Check if selected state has timeseries data
  useEffect(() => {
    const isProcessed = processedStates.includes(selectedState)
    setShowTimeseriesMessage(!isProcessed)
  }, [selectedState, processedStates])

  useEffect(() => {
    fetchElectionData(selectedState)
  }, [selectedState])

  const processedData = electionData ? processElectionData(electionData) : null

  const fetchNationalData = async () => {
    setLoadingNational(true)
    setError(null)
    
    try {
      const statesData = []
      
      // Fetch data for key states (you can expand this list)
      const keyStates = [
        'California', 'Texas', 'Florida', 'New-York', 'Pennsylvania', 
        'Illinois', 'Ohio', 'Georgia', 'North-Carolina', 'Michigan',
        'New-Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts',
        'Tennessee', 'Indiana', 'Maryland', 'Missouri', 'Wisconsin'
      ]
      
      for (const state of keyStates) {
        try {
          const url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.toLowerCase().replace(/\-/g, '')}/president.json`
          const response = await fetch(url)
          
          if (response.ok) {
            const data = await response.json()
            const stateData = processElectionData(data)
            statesData.push({
              state: stateData.state,
              totalVotes: stateData.totalVotes,
              percentageOfNation: 0 // Will calculate after getting all data
            })
          }
        } catch (stateError) {
          console.warn(`Failed to fetch data for ${state}:`, stateError)
        }
      }
      
      // Calculate total national votes and percentages
      const totalNationalVotes = statesData.reduce((sum, state) => sum + state.totalVotes, 0)
      
      // Update percentages
      const nationalDataWithPercentages = statesData.map(state => ({
        ...state,
        percentageOfNation: (state.totalVotes / totalNationalVotes) * 100
      }))
      
      // Sort by total votes (descending)
      nationalDataWithPercentages.sort((a, b) => b.totalVotes - a.totalVotes)
      
      setNationalData({
        states: nationalDataWithPercentages,
        totalNationalVotes
      })

      // Also create state-vs-nation comparison data for the selected state
      createStateVsNationData(nationalDataWithPercentages, totalNationalVotes)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch national data')
    } finally {
      setLoadingNational(false)
    }
  }

  const createStateVsNationData = (allStatesData: any[], totalNationalVotes: number) => {
    // Find the selected state in the national data
    const selectedStateData = allStatesData.find(state => 
      state.state.toLowerCase().replace(/\s+/g, '-') === selectedState.toLowerCase()
    )

    if (selectedStateData) {
      const otherStatesVotes = totalNationalVotes - selectedStateData.totalVotes
      const otherStatesPercentage = (otherStatesVotes / totalNationalVotes) * 100

      setStateVsNationData({
        selectedState: {
          name: selectedStateData.state,
          totalVotes: selectedStateData.totalVotes,
          percentageOfNation: selectedStateData.percentageOfNation
        },
        otherStates: {
          totalVotes: otherStatesVotes,
          percentageOfNation: otherStatesPercentage
        },
        totalNationalVotes
      })
    } else if (processedData) {
      // Fallback: use current state data and estimate national total
      const estimatedNationalTotal = processedData.totalVotes * 50 // Rough estimate
      const statePercentage = (processedData.totalVotes / estimatedNationalTotal) * 100
      const otherStatesVotes = estimatedNationalTotal - processedData.totalVotes
      const otherStatesPercentage = 100 - statePercentage

      setStateVsNationData({
        selectedState: {
          name: processedData.state,
          totalVotes: processedData.totalVotes,
          percentageOfNation: statePercentage
        },
        otherStates: {
          totalVotes: otherStatesVotes,
          percentageOfNation: otherStatesPercentage
        },
        totalNationalVotes: estimatedNationalTotal
      })
    }
  }

  // Fetch national data when national view is enabled
  useEffect(() => {
    if (showNationalView && !nationalData) {
      fetchNationalData()
    }
  }, [showNationalView])

  // Update state-vs-nation data when selected state changes
  useEffect(() => {
    if (nationalData) {
      createStateVsNationData(nationalData.states, nationalData.totalNationalVotes)
    }
  }, [selectedState, nationalData, processedData])

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <StateSelector
          states={US_STATES}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          processedStates={processedStates}
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (showTimeseriesGenerator) {
                // Refresh processed states when closing generator
                const savedStates = getProcessedStates()
                setProcessedStates(savedStates)
              }
              setShowTimeseriesGenerator(!showTimeseriesGenerator)
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            {showTimeseriesGenerator ? 'Hide' : 'Show'} Timeseries Generator
          </button>
          
          <button
            onClick={() => setShowNationalView(!showNationalView)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showNationalView ? 'Show State View' : 'Show National View'}
          </button>
        </div>
      </div>

      {showTimeseriesGenerator && (
        <div className="mb-8">
          <TimeseriesGenerator />
        </div>
      )}

      {/* Timeseries Message */}
      {showTimeseriesMessage && !showTimeseriesGenerator && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Timeseries Data Not Available for {selectedState.replace(/-/g, ' ')}
              </h3>
              <p className="text-yellow-700 mb-3">
                To view detailed timeseries charts and analysis for this state, you need to generate the timeseries data first.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowTimeseriesGenerator(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                >
                  Open Timeseries Generator
                </button>
                <p className="text-sm text-yellow-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Basic election data is still available below
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message for Processed States */}
      {!showTimeseriesMessage && !showTimeseriesGenerator && processedStates.includes(selectedState) && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700">
              <strong>Timeseries data available!</strong> Enhanced charts and analysis are ready for {selectedState.replace(/-/g, ' ')}.
            </p>
          </div>
        </div>
      )}

      {/* Timeseries Chart - Show when data is available */}
      {!showTimeseriesGenerator && processedStates.includes(selectedState) && (
        <div className="mb-8">
          <TimeseriesChart state={selectedState} />
        </div>
      )}

      {(loading || loadingNational) && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <div className="ml-4 text-gray-600">
            {loadingNational ? 'Loading national data...' : 'Loading...'}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {showNationalView && nationalData && !loadingNational && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">National Election Overview</h2>
            <p className="text-gray-600">States as percentage of total national vote count</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">States by Vote Share - National Donut Chart</h2>
            <VoteDonutChart data={nationalData} viewType="national" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">State Vote Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {nationalData.states.map((state, index) => (
                <div key={state.state} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ 
                        backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
                          '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#ec4899',
                          '#14b8a6', '#f43f5e', '#a855f7', '#22c55e', '#eab308',
                          '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][index % 20]
                      }}
                    ></div>
                    <span className="font-medium">{state.state}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{state.percentageOfNation.toFixed(2)}%</div>
                    <div className="text-sm text-gray-500">{state.totalVotes.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!showNationalView && processedData && !loading && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Election Summary Charts</h2>
            <p className="text-gray-600">Basic election data visualization for {selectedState.replace(/-/g, ' ')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Vote Distribution - Bar Chart</h2>
            <VoteBarChart data={processedData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Vote Share - Pie Chart</h2>
            <VotePieChart data={processedData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">State vs Nation - Donut Chart</h2>
            {stateVsNationData ? (
              <VoteDonutChart data={stateVsNationData} viewType="state-vs-nation" />
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading national comparison data...</p>
                  <button
                    onClick={fetchNationalData}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Load National Data
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Vote Trends - Line Chart</h2>
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">📊 10-Interval Average View</h3>
              <p className="text-xs text-blue-700">
                This chart averages all vote data points into 10 equal time intervals across the entire reporting period. 
                Each point represents the average vote share for that time interval, with dates showing the end of each interval.
              </p>
            </div>
            <VoteLineChart data={processedData} rawData={electionData || undefined} />
          </div>
        </div>
        </>
      )}
    </div>
  )
}

function processElectionData(data: ElectionData): StateData {
  // Find the top 2 candidates and group others
  const candidates = data.data?.races?.[0]?.candidates || []
  
  // Sort candidates by vote count
  const sortedCandidates = [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0))
  
  const top2 = sortedCandidates.slice(0, 2)
  const others = sortedCandidates.slice(2)
  
  const otherVotes = others.reduce((sum, candidate) => sum + (candidate.votes || 0), 0)
  
  const processedCandidates = [
    ...top2.map(candidate => ({
      name: candidate.name_display || candidate.last_name || 'Unknown',
      party: candidate.party_id || 'Independent',
      votes: candidate.votes || 0,
      percentage: candidate.percentage || 0
    })),
    ...(otherVotes > 0 ? [{
      name: 'Other Candidates',
      party: 'Other',
      votes: otherVotes,
      percentage: others.reduce((sum, candidate) => sum + (candidate.percentage || 0), 0)
    }] : [])
  ]

  return {
    state: data.data?.races?.[0]?.state_name || 'Unknown State',
    candidates: processedCandidates,
    totalVotes: candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0),
    reportingPercentage: data.data?.races?.[0]?.reporting || 0
  }
}