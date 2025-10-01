'use client'

import { useState, useRef, useEffect } from 'react'

interface StateInfo {
  name: string
  slug: string
  abbreviation: string
  electoral_votes: number
}

interface StateSelectorProps {
  states: StateInfo[]
  selectedState: string
  onStateChange: (state: string) => void
  processedStates?: string[]
  unavailableStates?: string[]
}

export default function StateSelector({ states, selectedState, onStateChange, processedStates = [], unavailableStates = [] }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debug logging
  console.log('StateSelector received:', { 
    statesCount: states.length, 
    selectedState, 
    firstState: states[0]?.name 
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleStateSelect = (state: string) => {
    onStateChange(state)
    setIsOpen(false)
  }

  const selectedStateProcessed = processedStates.includes(selectedState)
  const selectedStateInfo = states.find(state => state.slug === selectedState)
  const selectedDisplayName = selectedStateInfo ? selectedStateInfo.name : (selectedState ? selectedState.replace(/-/g, ' ') : 'Select a jurisdiction')

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-medium text-gray-700">
        Select a Jurisdiction:
      </label>
      
      <div className="relative" ref={dropdownRef}>
        {/* Custom Dropdown Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {selectedStateProcessed && (
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className={selectedStateProcessed ? 'text-green-700 font-medium' : ''}>
                {selectedDisplayName}
                {selectedStateProcessed && (
                  <span className="text-sm text-green-600 ml-1">(Enhanced)</span>
                )}
              </span>
            </span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {states.map((stateInfo) => {
              const isProcessed = processedStates.includes(stateInfo.slug)
              const isUnavailable = unavailableStates.includes(stateInfo.slug)
              const hasData = true // All states in database have data available
              const displayName = stateInfo.name
              const isSelected = stateInfo.slug === selectedState
              
              return (
                <button
                  key={stateInfo.slug}
                  type="button"
                  onClick={() => handleStateSelect(stateInfo.slug)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 ${
                    isSelected ? 'bg-blue-50 text-blue-700' : ''
                  } ${hasData && !isUnavailable ? 'border-l-2 border-l-green-500' : ''}`}
                >
                  {/* Show unavailable icon for states with no data */}
                  {isUnavailable && (
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {/* Show database icon for states with data */}
                  {hasData && !isUnavailable && (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="flex-1">
                    <span className={`${isUnavailable ? 'text-red-600 font-medium' : hasData ? 'text-green-700 font-medium' : ''}`}>
                      {displayName}
                    </span>
                    {isUnavailable && (
                      <span className="text-xs text-red-500 block">No Data Available</span>
                    )}
                    {hasData && !isUnavailable && (
                      <span className="text-xs text-green-600 block">Database + Charts Available</span>
                    )}
                  </div>
                  {isSelected && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
      
      {/* Stats and Legend */}
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Database records available
          </span>
          <span className="text-green-600">
            {states.length} jurisdictions
          </span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Charts & analytics ready
          </span>
          <span className="text-blue-600">
            {states.filter(state => !unavailableStates.includes(state.slug)).length} jurisdictions
          </span>
        </div>
        {unavailableStates.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              No data available
            </span>
            <span className="text-red-500">
              {unavailableStates.length} jurisdictions
            </span>
          </div>
        )}
      </div>
    </div>
  )
}