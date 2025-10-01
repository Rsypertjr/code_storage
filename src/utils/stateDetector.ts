import { promises as fs } from 'fs'
import path from 'path'

export interface DetectedState {
  name: string
  fileName: string
  fullPath: string
  lastModified: Date
}

/**
 * Scans the db folder for timeseries files and extracts state names
 */
export async function detectStatesFromDb(): Promise<DetectedState[]> {
  try {
    const dbPath = path.join(process.cwd(), 'db')
    const files = await fs.readdir(dbPath)
    
    const stateFiles: DetectedState[] = []
    const processedStates = new Set<string>()
    const processedStatesLower = new Set<string>() // For case-insensitive duplicate checking
    
    for (const file of files) {
      // Look for individual timeseries files with pattern: {state}-timeseries-{date}.json
      const timeseriesMatch = file.match(/^([a-zA-Z-]+)-timeseries-\d{4}-\d{2}-\d{2}\.json$/)
      
      if (timeseriesMatch) {
        const stateName = timeseriesMatch[1]
        const fullPath = path.join(dbPath, file)
        
        try {
          const stats = await fs.stat(fullPath)
          
          // Convert kebab-case to proper case for display
          // Handle special cases like 'of' in 'District-of-Columbia'
          const displayName = stateName
            .split('-')
            .map(word => {
              if (word.toLowerCase() === 'of') {
                return 'of' // Keep 'of' lowercase
              }
              return word.charAt(0).toUpperCase() + word.slice(1)
            })
            .join('-')
          
          // Only add if not already processed (prioritize first occurrence)
          if (!processedStatesLower.has(displayName.toLowerCase())) {
            stateFiles.push({
              name: displayName,
              fileName: file,
              fullPath,
              lastModified: stats.mtime
            })
            
            processedStates.add(displayName)
            processedStatesLower.add(displayName.toLowerCase())
          }
        } catch (error) {
          console.warn(`Could not get stats for file ${file}:`, error)
        }
      }
    }
    
    // Sort by state name for consistent ordering
    return stateFiles.sort((a, b) => a.name.localeCompare(b.name))
    
  } catch (error) {
    console.error('Error detecting states from db folder:', error)
    return []
  }
}

/**
 * Gets just the state names from detected files
 */
export async function getDetectedStateNames(): Promise<string[]> {
  const detectedStates = await detectStatesFromDb()
  return detectedStates.map(state => state.name)
}

/**
 * Checks if a specific state has a timeseries file
 */
export async function hasStateTimeseriesFile(stateName: string): Promise<boolean> {
  const detectedStates = await detectStatesFromDb()
  return detectedStates.some(state => 
    state.name.toLowerCase() === stateName.toLowerCase()
  )
}

/**
 * Gets the full path to a state's timeseries file
 */
export async function getStateTimeseriesPath(stateName: string): Promise<string | null> {
  const detectedStates = await detectStatesFromDb()
  const found = detectedStates.find(state => 
    state.name.toLowerCase() === stateName.toLowerCase()
  )
  return found ? found.fullPath : null
}