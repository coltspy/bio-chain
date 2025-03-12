'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulate loading project data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setProject({
        id: projectId,
        name: projectId === 'proj-1' ? 'Oncology Biomarkers Study' : 'Diabetes Genetics Research',
        description: 'This research project aims to identify novel biomarkers for early cancer detection in high-risk populations.',
        status: 'Active',
        progress: 65,
        createdAt: '2023-05-15',
        lastUpdated: '2023-06-10',
        specimens: 12,
        team: [
          { id: 1, name: 'Dr. Jane Smith', role: 'Principal Investigator', email: 'jane.smith@research.org' },
          { id: 2, name: 'Dr. Michael Chen', role: 'Co-Investigator', email: 'michael.chen@research.org' },
          { id: 3, name: 'Dr. Priya Patel', role: 'Research Associate', email: 'priya.patel@research.org' }
        ],
        timeline: [
          { id: 1, date: '2023-05-15', title: 'Project Created' },
          { id: 2, date: '2023-05-20', title: 'Initial Specimen Request' },
          { id: 3, date: '2023-06-02', title: 'First Specimens Received' },
          { id: 4, date: '2023-06-10', title: 'Analysis Started' }
        ],
        specimenData: [
          { name: 'Tumor Tissue', value: 5 },
          { name: 'Normal Tissue', value: 3 },
          { name: 'Blood', value: 4 }
        ],
        specimenList: [
          { id: 'spec-101', type: 'Tumor Tissue', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-102', type: 'Tumor Tissue', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-103', type: 'Tumor Tissue', biobank: 'Johns Hopkins', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-104', type: 'Tumor Tissue', biobank: 'Johns Hopkins', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-105', type: 'Tumor Tissue', biobank: 'Stanford Medical', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-106', type: 'Normal Tissue', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-107', type: 'Normal Tissue', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-108', type: 'Normal Tissue', biobank: 'Johns Hopkins', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-109', type: 'Blood', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-110', type: 'Blood', biobank: 'Mayo Clinic', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-111', type: 'Blood', biobank: 'Stanford Medical', received: '2023-06-02', status: 'In Analysis' },
          { id: 'spec-112', type: 'Blood', biobank: 'Harvard Biobank', received: '2023-06-02', status: 'In Analysis' }
        ]
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [projectId]);
  
  // Colors for charts
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
  
  // Get background color based on specimen type
  const getTypeColor = (type: string): string => {
    if (type.includes('Tumor')) return 'bg-red-100';
    if (type.includes('Normal')) return 'bg-green-100';
    if (type.includes('Blood')) return 'bg-blue-100';
    if (type.includes('Plasma')) return 'bg-purple-100';
    if (type.includes('Serum')) return 'bg-indigo-100';
    return 'bg-gray-100';
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-indigo-600 animate-[spin_1s_linear_infinite] rounded-full absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900">Project not found</h2>
          <p className="mt-2 text-sm text-gray-500">The project you're looking for doesn't exist or you don't have access.</p>
          <div className="mt-6">
            <Link href="/researcher/dashboard" className="text-indigo-600 hover:text-indigo-800">
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Link 
                href="/researcher/dashboard"
                className="mr-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <span className={`ml-3 px-2.5 py-0.5 text-xs rounded-full ${
                project.status === 'Active' ? 'bg-green-100 text-green-800' : 
                project.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Created on {project.createdAt} • Last updated {project.lastUpdated}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Edit Project
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Export Data
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Request More Specimens
            </button>
          </div>
        </div>
      </div>
      
      {/* Project Progress */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium text-gray-900">Project Progress</h2>
            <p className="text-sm text-gray-500">{project.specimens} specimens in this project</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-indigo-600 h-4 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-900">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'specimens', label: 'Specimens' },
              { key: 'team', label: 'Team Members' },
              { key: 'timeline', label: 'Timeline' }
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
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Project Description</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Specimen Distribution */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Specimen Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={project.specimenData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {project.specimenData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Biobank Distribution */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Biobank Sources</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Mayo Clinic', value: 5 },
                          { name: 'Johns Hopkins', value: 3 },
                          { name: 'Stanford Medical', value: 2 },
                          { name: 'Harvard Biobank', value: 1 }
                        ]}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {project.specimenData.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {project.timeline.map((item: any) => (
                      <div key={item.id} className="p-4 flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'specimens' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project Specimens</h3>
                <div className="flex space-x-3">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-50">
                    Filter
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-50">
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Biobank
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Received
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.specimenList.map((specimen: any) => (
                      <tr key={specimen.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                          {specimen.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(specimen.type)}`}>
                            {specimen.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {specimen.biobank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {specimen.received}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {specimen.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Add Team Member
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.team.map((member: any) => (
                  <div key={member.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <p className="text-sm text-indigo-600">{member.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'timeline' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project Timeline</h3>
                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Add Event
                </button>
              </div>
              
              <div className="flow-root">
                <ul className="-mb-8">
                  {project.timeline.map((event: any, eventIdx: number) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== project.timeline.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{event.title}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime={event.date}>{event.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}