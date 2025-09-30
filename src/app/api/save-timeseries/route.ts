import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { filename, content, state } = await request.json()
    
    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content are required' },
        { status: 400 }
      )
    }
    
    // Ensure filename is safe
    const safeFilename = filename.replace(/[^a-z0-9.-]/gi, '_')
    const filePath = join(process.cwd(), 'db', safeFilename)
    
    // Write the file
    await writeFile(filePath, content, 'utf8')
    
    return NextResponse.json({
      success: true,
      message: `File ${safeFilename} saved successfully`,
      path: `db/${safeFilename}`,
      state
    })
    
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    )
  }
}