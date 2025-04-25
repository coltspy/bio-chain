'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContributorSamples() {
  const [isLoading, setIsLoading] = useState(true);
  interface Sample {
    id: string;
    type: string;
    date_collected: string;
    status: string;
    projects: number;
    location: string;
    consent_status: string;
    description: string;
    volume: string;
    storage: string;
    research_use: { project: string; date: string }[];
  }
  
  const [samples, setSamples] = useState<Sample[]>([]);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSamples([
        {
          id: 'S12345',
          type: 'Blood',
          date_collected: '2023-01-15',
          status: 'Active',
          projects: 2,
          location: 'Mayo Clinic Biobank',
          consent_status: 'Full Consent',
          description: 'Whole blood sample collected for genetic research',
          volume: '10 mL',
          storage: 'Frozen (-80°C)',
          research_use: [
            { project: 'Oncology Biomarkers Study', date: '2023-02-10' },
            { project: 'Genetic Predisposition Research', date: '2023-04-05' },
          ]
        },
        {
          id: 'S12346',
          type: 'Tumor Tissue',
          date_collected: '2023-02-22',
          status: 'Active',
          projects: 1,
          location: 'Johns Hopkins Biorepository',
          consent_status: 'Limited Consent',
          description: 'Tumor biopsy from breast tissue',
          volume: '3 slides',
          storage: 'FFPE',
          research_use: [
            { project: 'Oncology Biomarkers Study', date: '2023-03-15' },
          ]
        },
        {
          id: 'S12347',
          type: 'Plasma',
          date_collected: '2023-03-10',
          status: 'Active',
          projects: 1,
          location: 'Mayo Clinic Biobank',
          consent_status: 'Full Consent',
          description: 'Plasma separated from whole blood',
          volume: '5 mL',
          storage: 'Frozen (-80°C)',
          research_use: [
            { project: 'Genetic Predisposition Research', date: '2023-04-05' },
          ]
        },
        {
          id: 'S12348',
          type: 'Normal Tissue',
          date_collected: '2023-02-22',
          status: 'Stored',
          projects: 0,
          location: 'Johns Hopkins Biorepository',
          consent_status: 'Limited Consent',
          description: 'Normal breast tissue adjacent to tumor',
          volume: '2 slides',
          storage: 'FFPE',
          research_use: []
        }
      ]);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = searchTerm === '' || 
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus === 'all' || sample.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getSampleTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'blood': return 'bg-red-100 text-red-800';
      case 'tumor tissue': return 'bg-purple-100 text-purple-800';
      case 'plasma': return 'bg-blue-100 text-blue-800';
      case 'normal tissue': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSampleTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'blood': return '🩸';
      case 'tumor tissue': return '🔬';
      case 'plasma': return '💉';
      case 'normal tissue': return '🧬';
      default: return '🧪';
    }
  };

  return (
    <div className="p-6 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Samples</h1>
          <p className="text-sm text-gray-500">Track and manage your biological samples</p>
        </div>
        <div>
          <Link 
            href="/contributor/consent"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Manage Consent
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6 animate-[fadeIn_0.7s_ease-in-out]">
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 animate-[fadeIn_0.8s_ease-in-out]">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search samples..."
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="stored">Stored</option>
                </select>
              </div>
              
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`px-4 py-2 ${view === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-500'}`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 ${view === 'list' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-500'}`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-[fadeIn_0.9s_ease-in-out] space-y-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="animate-pulse h-24 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="animate-pulse h-5 w-24 bg-gray-200 rounded mb-3"></div>
                    <div className="animate-pulse h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="animate-pulse h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-lg">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="animate-pulse h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="animate-pulse h-5 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {filteredSamples.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center animate-[fadeIn_0.9s_ease-in-out]">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No samples found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.9s_ease-in-out]">
              {filteredSamples.map((sample) => (
                <div key={sample.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className={`p-4 ${getSampleTypeColor(sample.type)}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getSampleTypeIcon(sample.type)}</span>
                        <h3 className="text-sm font-medium">{sample.type}</h3>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sample.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">ID: {sample.id}</h4>
                      <span className="text-sm text-gray-500">{sample.date_collected}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{sample.description}</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Location</span>
                        <span className="text-xs font-medium text-gray-700">{sample.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Consent</span>
                        <span className="text-xs font-medium text-gray-700">{sample.consent_status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Used in</span>
                        <span className="text-xs font-medium text-gray-700">{sample.projects} projects</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        View details
                      </button>
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        Update consent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-lg animate-[fadeIn_0.9s_ease-in-out]">
              {filteredSamples.map((sample) => (
                <div key={sample.id} className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getSampleTypeColor(sample.type)} flex items-center justify-center`}>
                        <span className="text-lg">{getSampleTypeIcon(sample.type)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{sample.id}</div>
                        <div className="text-sm text-gray-500">{sample.type}</div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sample.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sample.status}
                      </span>
                      <span className="text-xs text-gray-500">{sample.date_collected}</span>
                      <button className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        Details
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{sample.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">Location: <span className="font-medium text-gray-700">{sample.location}</span></span>
                      <span className="text-xs text-gray-500">• Consent: <span className="font-medium text-gray-700">{sample.consent_status}</span></span>
                      <span className="text-xs text-gray-500">• Projects: <span className="font-medium text-gray-700">{sample.projects}</span></span>
                      <span className="text-xs text-gray-500">• Storage: <span className="font-medium text-gray-700">{sample.storage}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      <div className="mt-6 mb-10 animate-[fadeIn_1s_ease-in-out]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Understanding Your Sample Journey</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 rounded-full p-2 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="ml-3 text-lg font-medium text-gray-900">Collection & Storage</h4>
              </div>
              <p className="text-sm text-gray-600">Your samples are securely stored in specialized biobanks with proper temperature control and cataloging systems.</p>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 rounded-full p-2 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h4 className="ml-3 text-lg font-medium text-gray-900">Research Use</h4>
              </div>
              <p className="text-sm text-gray-600">Researchers can request your samples for studies, but only within the bounds of your consent preferences.</p>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 rounded-full p-2 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="ml-3 text-lg font-medium text-gray-900">Benefits</h4>
              </div>
              <p className="text-sm text-gray-600">When your samples contribute to research, you receive proportional benefits based on their usage and impact.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}