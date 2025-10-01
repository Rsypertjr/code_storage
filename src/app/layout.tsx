import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'President Votes - 2020 Election Data',
  description: 'Interactive visualization of 2020 presidential election data by jurisdiction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-900 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">President Votes 2020</h1>
            <p className="text-gray-300">Interactive Election Data Visualization</p>
          </div>
        </header>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}