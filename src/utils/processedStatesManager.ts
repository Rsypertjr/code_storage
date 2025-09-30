// Utility functions for managing processed states across different environments

export const PROCESSED_STATES_KEY = 'processedTimeseriesStates'

export function getProcessedStates(): string[] {
  if (typeof window === 'undefined') {
    // Node.js environment - would need file system access
    return []
  }
  
  try {
    const saved = localStorage.getItem(PROCESSED_STATES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading processed states:', error)
    return []
  }
}

export function saveProcessedStates(states: string[]): void {
  if (typeof window === 'undefined') {
    // Node.js environment - would need file system access
    return
  }
  
  try {
    localStorage.setItem(PROCESSED_STATES_KEY, JSON.stringify(states))
  } catch (error) {
    console.error('Error saving processed states:', error)
  }
}

export function addProcessedState(state: string): string[] {
  const currentStates = getProcessedStates()
  if (!currentStates.includes(state)) {
    const updatedStates = [...currentStates, state]
    saveProcessedStates(updatedStates)
    return updatedStates
  }
  return currentStates
}

export function removeProcessedState(state: string): string[] {
  const currentStates = getProcessedStates()
  const updatedStates = currentStates.filter(s => s !== state)
  saveProcessedStates(updatedStates)
  return updatedStates
}

export function clearProcessedStates(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PROCESSED_STATES_KEY)
  }
}

export function isStateProcessed(state: string): boolean {
  return getProcessedStates().includes(state)
}

// Format state name for display
export function formatStateName(state: string): string {
  return state.replace(/-/g, ' ')
}

// Format state name for file/API usage
export function formatStateForApi(state: string): string {
  return state.toLowerCase().replace(/\-/g, '')
}

// Get statistics about processed states
export function getProcessedStatesStats() {
  const processedStates = getProcessedStates()
  const totalStates = 50 // US states
  
  return {
    processed: processedStates.length,
    remaining: totalStates - processedStates.length,
    percentage: Math.round((processedStates.length / totalStates) * 100),
    processedStates
  }
}