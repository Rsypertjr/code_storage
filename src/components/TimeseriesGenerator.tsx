'use client'

import { useState, useEffect } from 'react'
import { fetchAndProcessTimeseries } from '@/utils/timeseriesProcessor'
import { 
  getProcessedStates, 
  addProcessedState, 
  clearProcessedStates as clearProcessedStatesUtil,
  getProcessedStatesStats,
  formatStateName 
} from '@/utils/processedStatesManager'

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

export default function TimeseriesGenerator() {
  const [selectedStates, setSelectedStates] = useState<string[]>(['California'])
  const [processedStates, setProcessedStates] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState('')
  const [generatedData, setGeneratedData] = useState<any>(null)

  // Load processed states from localStorage on component mount
  useEffect(() => {
    const savedStates = getProcessedStates()
    setProcessedStates(savedStates)
  }, [])

  // Clean up selectedStates to remove any processed states
  useEffect(() => {
    if (processedStates.length > 0) {
      setSelectedStates(prev => prev.filter(state => !processedStates.includes(state)))
    }
  }, [processedStates])

  const handleStateToggle = (state: string) => {
    // Don't allow toggling of already processed states
    if (processedStates.includes(state)) {
      return
    }
    
    setSelectedStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state)
        : [...prev, state]
    )
  }

  const handleSelectAll = () => {
    // Only select states that haven't been processed yet
    const unprocessedStates = US_STATES.filter(state => !processedStates.includes(state))
    setSelectedStates(unprocessedStates)
  }

  const handleSelectNone = () => {
    setSelectedStates([])
  }

  const markStateAsProcessed = (state: string) => {
    const updatedStates = addProcessedState(state)
    setProcessedStates(updatedStates)
  }

  const clearProcessedStates = () => {
    clearProcessedStatesUtil()
    setProcessedStates([])
    setProgress('Cleared all processed state records')
  }

  const removeProcessedState = (state: string) => {
    const updatedStates = processedStates.filter(s => s !== state)
    setProcessedStates(updatedStates)
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('processedTimeseriesStates', JSON.stringify(updatedStates))
    }
    setProgress(`Reset ${state} - can now be selected again`)
  }

  const generateSingleState = async (state: string) => {
    setIsGenerating(true)
    setProgress(`Processing ${state}...`)
    
    try {
      const data = await fetchAndProcessTimeseries(state)
      if (data) {
        setGeneratedData(data)
        
        // Save to db folder and download JSON file
        const timestamp = new Date().toISOString().split('T')[0]
        const filename = `${state.toLowerCase()}-timeseries-${timestamp}.json`
        const jsonContent = JSON.stringify(data, null, 2)
        
        // Save to server db folder
        try {
          const saveResponse = await fetch('/api/save-timeseries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filename,
              content: jsonContent,
              state
            })
          })
          
          if (saveResponse.ok) {
            console.log(`File saved to server: db/${filename}`)
          }
        } catch (error) {
          console.error('Failed to save file to server:', error)
        }
        
        // Download the file
        const blob = new Blob([jsonContent], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        markStateAsProcessed(state)
        setProgress(`Successfully generated timeseries for ${state}`)
      } else {
        setProgress(`Failed to generate data for ${state}`)
      }
    } catch (error) {
      setProgress(`Error processing ${state}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMultipleStates = async () => {
    if (selectedStates.length === 0) {
      setProgress('Please select at least one state')
      return
    }

    setIsGenerating(true)
    const allData: { [key: string]: any } = {}
    
    for (let i = 0; i < selectedStates.length; i++) {
      const state = selectedStates[i]
      setProgress(`Processing ${state} (${i + 1}/${selectedStates.length})...`)
      
      try {
        const data = await fetchAndProcessTimeseries(state)
        if (data) {
          allData[state] = data
          markStateAsProcessed(state)
        }
        // Add delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (error) {
        console.error(`Error processing ${state}:`, error)
      }
    }
    
    if (Object.keys(allData).length > 0) {
      setGeneratedData(allData)
      
      // Save combined file with db folder reference
      const timestamp = new Date().toISOString().split('T')[0]
      const actualStatesCount = Object.keys(allData).length
      const filename = `election-timeseries-${actualStatesCount}-states-${timestamp}.json`
      const jsonContent = JSON.stringify(allData, null, 2)
      
      // Save combined file to server db folder
      try {
        const saveResponse = await fetch('/api/save-timeseries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename,
            content: jsonContent,
            state: `${selectedStates.length} states combined`
          })
        })
        
        if (saveResponse.ok) {
          console.log(`Combined file saved to server: db/${filename}`)
        }
      } catch (error) {
        console.error('Failed to save combined file to server:', error)
      }
      
      // Download combined JSON file
      const blob = new Blob([jsonContent], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setProgress(`Successfully generated timeseries for ${Object.keys(allData).length} states`)
    } else {
      setProgress('No data could be generated')
    }
    
    setIsGenerating(false)
  }

  const stats = getProcessedStatesStats()

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Timeseries Data Generator</h2>
      
      {/* Help Text */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <p className="text-blue-800">
          <strong>How it works:</strong> States with green checkmarks have already been processed and are disabled. 
          Use "Reset" next to a state to allow regeneration, or "Clear Processed" to reset all states.
        </p>
      </div>
      
      {/* Progress Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Progress Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded shadow">
            <div className="text-2xl font-bold text-green-600">{stats.processed}</div>
            <div className="text-sm text-gray-600">Processed</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-2xl font-bold text-orange-600">{stats.remaining}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.percentage}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-2xl font-bold text-purple-600">{selectedStates.length}</div>
            <div className="text-sm text-gray-600">Selected</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Select Unprocessed ({US_STATES.length - processedStates.length})
          </button>
          <button
            onClick={handleSelectNone}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Selection
          </button>
          <button
            onClick={clearProcessedStates}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Processed ({processedStates.length})
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto border p-4 rounded">
          {US_STATES.map(state => {
            const isProcessed = processedStates.includes(state)
            return (
              <label key={state} className={`flex items-center space-x-2 p-1 rounded ${
                isProcessed ? 'bg-green-50 border border-green-200 opacity-75' : ''
              }`}>
                <input
                  type="checkbox"
                  checked={selectedStates.includes(state)}
                  onChange={() => handleStateToggle(state)}
                  disabled={isProcessed}
                  className={`rounded ${
                    isProcessed ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                <span className={`text-sm flex items-center gap-1 ${
                  isProcessed ? 'text-green-700 font-medium' : ''
                }`}>
                  {formatStateName(state)}
                  {isProcessed && (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isProcessed && (
                    <>
                      <span className="text-xs text-green-600 ml-1">(Generated)</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeProcessedState(state)
                        }}
                        className="ml-2 text-xs text-red-500 hover:text-red-700 underline"
                        title="Reset this state to allow regeneration"
                      >
                        Reset
                      </button>
                    </>
                  )}
                </span>
              </label>
            )
          })}
        </div>
        
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          {(() => {
            const actualSelectedCount = selectedStates.filter(state => !processedStates.includes(state)).length
            return (
              <p>Selected: {actualSelectedCount} state{actualSelectedCount !== 1 ? 's' : ''}</p>
            )
          })()}
          <p className="text-green-600">✓ Processed: {processedStates.length} state{processedStates.length !== 1 ? 's' : ''} (disabled)</p>
          <p className="text-blue-600">Available: {US_STATES.length - processedStates.length} state{(US_STATES.length - processedStates.length) !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateMultipleStates}
          disabled={isGenerating || selectedStates.filter(state => !processedStates.includes(state)).length === 0}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {(() => {
            const actualSelectedCount = selectedStates.filter(state => !processedStates.includes(state)).length
            return isGenerating ? 'Generating...' : `Generate Selected States (${actualSelectedCount})`
          })()}
        </button>
        
        {selectedStates.length === 1 && (
          <button
            onClick={() => generateSingleState(selectedStates[0])}
            disabled={isGenerating}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Generate {formatStateName(selectedStates[0])} Only
          </button>
        )}
      </div>

      {progress && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800">{progress}</p>
        </div>
      )}

      {generatedData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Sample Generated Data:</h3>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
            {JSON.stringify(generatedData, null, 2).substring(0, 1000)}...
          </pre>
        </div>
      )}
    </div>
  )
}