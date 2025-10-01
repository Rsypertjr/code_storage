export interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  category: string
  message: string
  data?: any
}

class Logger {
  private async sendLogToServer(entry: LogEntry) {
    try {
      await fetch('/api/logger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry)
      })
    } catch (error) {
      // Fallback to console if API fails
      console.error('Failed to send log to server:', error)
    }
  }

  info(category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      category,
      message,
      data
    }
    
    // Always log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${category}] ${message}`, data || '')
    }
    
    // Send to server for file logging
    this.sendLogToServer(entry)
  }

  warn(category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      category,
      message,
      data
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[${category}] ${message}`, data || '')
    }
    
    this.sendLogToServer(entry)
  }

  error(category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      category,
      message,
      data
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${category}] ${message}`, data || '')
    }
    
    this.sendLogToServer(entry)
  }

  debug(category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'DEBUG',
      category,
      message,
      data
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG][${category}] ${message}`, data || '')
    }
    
    this.sendLogToServer(entry)
  }
}

// Create singleton instance
const logger = new Logger()
export default logger