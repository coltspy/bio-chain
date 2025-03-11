// app/researcher/dashboard/page.tsx
import Link from 'next/link';

export default function ResearcherDashboard() {
  // Mock data
  const stats = [
    { title: 'Available Biobanks', value: '8', icon: '🏥' },
    { title: 'Sample Types', value: '45', icon: '🧪' },
    { title: 'Active Requests', value: '3', icon: '📋' },
  ];

  const recentSearches = [
    { id: 1, query: 'Blood plasma, type AB+, aged 45-60' },
    { id: 2, query: 'Kidney tissue, diabetic patients' },
    { id: 3, query: 'Lung biopsies, non-smokers, female' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Researcher Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover biospecimens, track requests, and manage research projects
        </p>
      </div>

      {/* Demo Banner */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This is a demonstration of the research portal. No real biobank connections are active.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/researcher/search" className="block w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                New Sample Search
              </Link>
              <Link href="/researcher/requests" className="block w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                View Pending Requests
              </Link>
              <Link href="/researcher/projects" className="block w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                Manage Research Projects
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <div key={search.id} className="border-b border-gray-200 pb-2 last:border-0">
                  <p className="text-sm">{search.query}</p>
                  <Link href={`/researcher/search?q=${encodeURIComponent(search.query)}`} className="text-xs text-indigo-600">
                    Run again →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}