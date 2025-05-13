import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">FitGraph</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/workouts" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  Workouts
                </Link>
                <Link href="/analytics" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  Analytics
                </Link>
                <Link href="/ai-coach" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  AI Coach
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/profile" className="p-1 rounded-full text-white hover:bg-primary-700">
                <span className="sr-only">Profile</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}