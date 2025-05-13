import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitGraph - AI-Powered Workout Generator & Tracker',
  description: 'Plan and log workouts, get personalized routines using LLM prompts, view weekly trends.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} FitGraph. All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Terms of Service
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}