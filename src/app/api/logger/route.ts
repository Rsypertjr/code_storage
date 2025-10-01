import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { LogEntry } from '@/utils/logger'

export async function POST(request: NextRequest) {
  try {
    const logEntry: LogEntry = await request.json()
    
    // Ensure logs directory exists
    const logsDir = path.join(process.cwd(), 'logs')
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
    
    // Create log file name based on category and date
    const date = new Date().toISOString().split('T')[0]
    const logFileName = path.join(logsDir, `${logEntry.category}-${date}.log`)
    
    // Format log entry
    const logLine = `[${logEntry.timestamp}] ${logEntry.level} - ${logEntry.message}${
      logEntry.data ? ` | Data: ${JSON.stringify(logEntry.data)}` : ''
    }\n`
    
    // Append to log file
    fs.appendFileSync(logFileName, logLine)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logger API error:', error)
    return NextResponse.json(
      { error: 'Failed to write log' },
      { status: 500 }
    )
  }
}