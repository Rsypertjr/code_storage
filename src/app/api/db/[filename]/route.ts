import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    // Security: only allow JSON files and prevent path traversal
    if (!filename.endsWith('.json') || filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }
    
    const filePath = join(process.cwd(), 'db', filename)
    
    try {
      const fileContent = await readFile(filePath, 'utf8')
      const jsonData = JSON.parse(fileContent)
      
      return NextResponse.json(jsonData)
    } catch (fileError) {
      return NextResponse.json(
        { error: 'File not found or invalid JSON' },
        { status: 404 }
      )
    }
    
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}