'use client'

import { useState, useEffect } from 'react'
import StateSelector from '@/components/StateSelector'
import TimeseriesChart from '@/components/charts/TimeseriesChartSimple'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'

interface StateInfo {
  name: string
  slug: string
  abbreviation: string
  electoral_votes: number
}

export default function Home() {
  const [selectedState, setSelectedState] = useState<string>('')
  const [availableStates, setAvailableStates] = useState<StateInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Load available states from Supabase on component mount
  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/detect-states')
        const result = await response.json()
        
        console.log('API Response:', result) // Debug log
        
        if (result.success) {
          console.log('States loaded:', result.states.length, 'states') // Debug log
          setAvailableStates(result.states)
          // Set first state as default if none selected
          if (result.states.length > 0 && !selectedState) {
            console.log('Setting default state:', result.states[0].slug) // Debug log
            setSelectedState(result.states[0].slug)
          }
        } else {
          console.error('Failed to load states:', result.message)
        }
      } catch (error) {
        console.error('Error loading states:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadStates()
  }, []) // Remove selectedState from dependency array

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <div className="ml-4 text-gray-600">Loading states from database...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Presidential Election 2020 - Timeseries Data</h1>
        </div>
        
        <p className="text-gray-600">
          Data is loaded from Supabase database with {availableStates.length} jurisdictions available.
        </p>
      </div>

      {/* State Selection and Charts */}
      <div className="space-y-8">
        {availableStates.length > 0 ? (
          <StateSelector 
            states={availableStates}
            selectedState={selectedState}
            onStateChange={setSelectedState}
          />
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700">
              Loading jurisdictions... ({availableStates.length} jurisdictions loaded)
            </p>
          </div>
        )}

        {selectedState && (
          <div className="space-y-8">
            <TimeseriesChart 
              state={selectedState}
            />
            
            <AnalyticsDashboard />
          </div>
        )}

        {availableStates.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">No Jurisdictions Found</h3>
                <p className="text-yellow-700">
                  No jurisdictions were found in the Supabase database. Please check your database connection and ensure the migration has been completed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
