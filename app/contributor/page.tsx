// app/contributor/page.tsx
import Link from 'next/link';

export default function ContributorDashboard() {
  // Mock data
  const stats = [
    { title: 'Active Samples', value: '3', icon: '🧪' },
    { title: 'Research Uses', value: '4', icon: '🔬' },
    { title: 'Benefits Earned', value: '$240.50', icon: '💰' },
  ];

  const recentActivity = [
    { 
      id: '1', 
      type: 'sample-used', 
      title: 'Sample Used', 
      description: 'Your blood sample (S12345) was used in research project RES789',
      date: '2 days ago',
    },
    { 
      id: '2', 
      type: 'benefit-received', 
      title: 'Benefit Received', 
      description: 'You received $120 from research project RES456',
      date: '1 week ago',
    },
    { 
      id: '3', 
      type: 'consent-updated', 
      title: 'Consent Updated', 
      description: 'You updated consent preferences for sample S12346',
      date: '2 weeks ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sample Provider Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your samples, track research, and manage benefits
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
              <strong>Demo Mode:</strong> This is a demonstration showing how patients can track their donated samples. No real data is displayed.
            </p>
          </div>
        </div>
      </div>

      {/* Highlight Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl text-white mb-6">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-12 w-12 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <h2 className="text-xl font-bold">Your samples are helping advance research</h2>
              <p className="mt-1 text-indigo-100">Your contributions have been used in 2 active research projects</p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-800 bg-opacity-50 px-6 py-3">
          <Link href="/contributor/impact" className="text-sm text-indigo-100 hover:text-white flex items-center">
            <span>Learn about research impact</span>
            <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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

      {/* Sample Overview */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sample Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">Sample Types</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 mr-2">
                    🩸
                  </div>
                  <div>
                    <div className="font-medium">Blood Sample</div>
                    <div className="text-xs text-gray-500">1 active sample</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 mr-2">
                    🔬
                  </div>
                  <div>
                    <div className="font-medium">Tumor Tissue</div>
                    <div className="text-xs text-gray-500">1 active sample</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mr-2">
                    💉
                  </div>
                  <div>
                    <div className="font-medium">Plasma</div>
                    <div className="text-xs text-gray-500">1 active sample</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">Research Projects</div>
              <div className="space-y-2">
                <div className="p-2 border border-gray-200 rounded-md">
                  <div className="font-medium">Oncology Biomarkers Study</div>
                  <div className="text-xs text-gray-500">Using 1 sample</div>
                </div>
                <div className="p-2 border border-gray-200 rounded-md">
                  <div className="font-medium">Genetic Predisposition Research</div>
                  <div className="text-xs text-gray-500">Using 1 sample</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">Recent Benefits</div>
              <div className="space-y-2">
                <div className="p-2 border border-gray-200 rounded-md">
                  <div className="font-medium">$120.00</div>
                  <div className="text-xs text-gray-500">Received on Apr 15, 2023</div>
                </div>
                <div className="p-2 border border-gray-200 rounded-md">
                  <div className="font-medium">$75.50</div>
                  <div className="text-xs text-gray-500">Received on Mar 22, 2023</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/contributor/samples" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all samples →
            </Link>
            <Link href="/contributor/benefits" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all benefits →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100">
                    <span className="text-lg">
                      {activity.type === 'sample-used' ? '🧪' : 
                       activity.type === 'benefit-received' ? '💰' : '📝'}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      activity.type === 'sample-used' ? 'bg-blue-100 text-blue-800' : 
                      activity.type === 'benefit-received' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="mt-1 text-xs text-gray-400">{activity.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Link href="/contributor/activity" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View all activity →
          </Link>
        </div>
      </div>
    </div>
  );
}