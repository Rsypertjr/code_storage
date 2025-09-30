'use client'

import { useState, useRef, useEffect } from 'react'

interface StateSelectorProps {
  states: string[]
  selectedState: string
  onStateChange: (state: string) => void
  processedStates?: string[]
}

export default function StateSelector({ states, selectedState, onStateChange, processedStates = [] }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
  const selectedDisplayName = selectedState.replace(/-/g, ' ')

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-medium text-gray-700">
        Select a State:
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
            {states.map((state) => {
              const isProcessed = processedStates.includes(state)
              const displayName = state.replace(/-/g, ' ')
              const isSelected = state === selectedState
              
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => handleStateSelect(state)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 ${
                    isSelected ? 'bg-blue-50 text-blue-700' : ''
                  } ${isProcessed ? 'border-l-2 border-l-green-500' : ''}`}
                >
                  {isProcessed && (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="flex-1">
                    <span className={isProcessed ? 'text-green-700 font-medium' : ''}>
                      {displayName}
                    </span>
                    {isProcessed && (
                      <span className="text-xs text-green-600 block">Timeseries Available</span>
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
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Enhanced charts available
          </span>
          <span className="text-green-600">
            {processedStates.length} of {states.length} states
          </span>
        </div>
      </div>
    </div>
  )
}