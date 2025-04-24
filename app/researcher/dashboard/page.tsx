'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, 
  Legend
} from 'recharts';

export default function ResearcherDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setRecentActivity([
        { id: 1, type: 'inquiry', title: 'New inquiry created', description: 'Blood samples (5) for Diabetes Research', date: '2 hours ago' },
        { id: 2, type: 'approval', title: 'Request approved', description: 'Mayo Clinic approved your request for tumor tissue samples', date: '1 day ago' },
        { id: 3, type: 'shipped', title: 'Specimens shipped', description: 'Your request SP-789012 has been shipped', date: '3 days ago' },
        { id: 4, type: 'data', title: 'Data available', description: 'New clinical data available for your specimens', date: '1 week ago' },
      ]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const stats = [
    { title: 'Total Specimens', value: '5,284', change: '+124', icon: '🧪' },
    { title: 'Available Biobanks', value: '10', change: '+2', icon: '🏥' },
    { title: 'Active Requests', value: '3', change: '0', icon: '📋' },
    { title: 'Inquiries this Month', value: '8', change: '+3', icon: '📝' },
  ];
  
  const sampleTypes = [
    { name: 'Blood', value: 1865 },
    { name: 'Tumor Tissue', value: 1248 },
    { name: 'Normal Tissue', value: 945 },
    { name: 'Plasma/Serum', value: 1226 },
  ];
  
  const biobanks = [
    { name: 'Mayo Clinic', specimens: 1250, id: 'mayo' },
    { name: 'Johns Hopkins', specimens: 980, id: 'jh' },
    { name: 'Stanford Medical', specimens: 845, id: 'stanford' },
    { name: 'UCSF Repository', specimens: 720, id: 'ucsf' },
    { name: 'Harvard Biobank', specimens: 650, id: 'harvard' },
  ];
  
  const recentProjects = [
    {
      id: 'proj-1',
      name: 'Oncology Biomarkers Study',
      status: 'Active',
      progress: 65,
      specimens: 12,
      lastUpdated: '2 days ago'
    },
    {
      id: 'proj-2',
      name: 'Diabetes Genetics Research',
      status: 'Active',
      progress: 40,
      specimens: 8,
      lastUpdated: '1 week ago'
    },
    {
      id: 'proj-3',
      name: 'Cardiovascular Disease Analysis',
      status: 'Draft',
      progress: 10,
      specimens: 0,
      lastUpdated: '3 days ago'
    }
  ];
  
  const monthlyActivityData = [
    { month: 'Jan', searches: 45, specimens: 12, inquiries: 5 },
    { month: 'Feb', searches: 52, specimens: 18, inquiries: 7 },
    { month: 'Mar', searches: 61, specimens: 20, inquiries: 10 },
    { month: 'Apr', searches: 58, specimens: 15, inquiries: 6 },
    { month: 'May', searches: 48, specimens: 10, inquiries: 4 },
    { month: 'Jun', searches: 55, specimens: 22, inquiries: 9 },
  ];
  
  const recentSearches = [
    { id: 1, query: 'Blood plasma, type AB+, aged 45-60', results: 28, date: '2 days ago' },
    { id: 2, query: 'Kidney tissue, diabetic patients', results: 42, date: '3 days ago' },
    { id: 3, query: 'Lung biopsies, non-smokers, female', results: 15, date: '5 days ago' },
    { id: 4, query: 'Brain tissue, Alzheimer\'s patients over 70', results: 23, date: '1 week ago' },
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Researcher Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome to the AminoChain Specimen Center
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/researcher/search" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            New Search
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export Data
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'projects', label: 'Projects' },
              { key: 'analytics', label: 'Analytics' },
              { key: 'activity', label: 'Recent Activity' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-indigo-600 animate-[spin_1s_linear_infinite] rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                          </div>
                          <div className="flex h-12 w-12 rounded-full bg-indigo-50 text-indigo-700 items-center justify-center text-xl">
                            {stat.icon}
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="text-xs font-medium text-green-600">{stat.change} this month</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Specimen Distribution</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={sampleTypes}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {sampleTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Monthly Activity</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={monthlyActivityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="searches" stroke="#8884d8" activeDot={{ r: 8 }} name="Searches" />
                            <Line type="monotone" dataKey="specimens" stroke="#82ca9d" name="Specimens" />
                            <Line type="monotone" dataKey="inquiries" stroke="#ffc658" name="Inquiries" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Link href="/researcher/search" className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          New Specimen Search
                        </Link>
                        <Link href="/researcher/inquiries" className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          View Pending Inquiries
                        </Link>
                        <Link href="/researcher/projects/new" className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create New Project
                        </Link>
                        <Link href="/researcher/settings" className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Account Settings
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Recent Searches</h3>
                      <div className="divide-y divide-gray-200">
                        {recentSearches.map((search) => (
                          <div key={search.id} className="py-3 flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '300px' }}>{search.query}</p>
                              <p className="text-xs text-gray-500">{search.results} results • {search.date}</p>
                            </div>
                            <Link 
                              href={`/researcher/search?q=${encodeURIComponent(search.query)}`}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              Run again
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium text-gray-900">Connected Biobanks</h3>
                      <Link href="/researcher/biobanks" className="text-sm text-indigo-600 hover:text-indigo-800">
                        View all →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {biobanks.map((biobank) => (
                        <div key={biobank.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 mr-2">
                              🏥
                            </div>
                            <h4 className="font-medium text-gray-900 truncate">{biobank.name}</h4>
                          </div>
                          <p className="text-sm text-gray-500">{biobank.specimens.toLocaleString()} specimens</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'projects' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Your Research Projects</h3>
                    <Link 
                      href="/researcher/projects/new"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700"
                    >
                      New Project
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                              <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                              <span className={`ml-3 px-2.5 py-0.5 text-xs rounded-full ${
                                project.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                project.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {project.specimens} specimens • Last updated {project.lastUpdated}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                              <div 
                                className="bg-indigo-600 h-2.5 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{project.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-3">
                          <Link
                            href={`/researcher/projects/${project.id}`}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            View Details
                          </Link>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Export Data
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link 
                      href="/researcher/projects" 
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      View all projects →
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Usage Analytics</h3>
                    <div>
                      <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Activity Trends</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={monthlyActivityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="searches" stroke="#8884d8" activeDot={{ r: 8 }} name="Searches" />
                            <Line type="monotone" dataKey="specimens" stroke="#82ca9d" name="Specimens" />
                            <Line type="monotone" dataKey="inquiries" stroke="#ffc658" name="Inquiries" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Specimen Types Requested</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={sampleTypes}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
                            <Bar dataKey="value" fill="#8884d8">
                              {sampleTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                    <div>
                      <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>All Activities</option>
                        <option>Inquiries</option>
                        <option>Approvals</option>
                        <option>Shipments</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="p-6 hover:bg-gray-50">
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                activity.type === 'inquiry' ? 'bg-blue-100 text-blue-800' :
                                activity.type === 'approval' ? 'bg-green-100 text-green-800' :
                                activity.type === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                'bg-indigo-100 text-indigo-800'
                              }`}>
                                {activity.type === 'inquiry' ? '📋' :
                                 activity.type === 'approval' ? '✅' :
                                 activity.type === 'shipped' ? '📦' : '📊'}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-gray-500">{activity.date}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                      <Link 
                        href="/researcher/activity" 
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        View all activity →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}