// app/researcher/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ResearcherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Specimen Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Global biospecimen discovery platform
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
              <strong>Demo Mode:</strong> This is a demonstration of the AminoChain Specimen Center. Real biobank connections would provide access to 5000+ specimens.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Analytics Dashboard */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specimen Overview
            </button>
            <button
              onClick={() => setActiveTab('distribution')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'distribution'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Demographic Distribution
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'network'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Biobank Network
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Total Specimens</h3>
                    <span className="text-xs text-gray-400">Updated today</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">5,284</span>
                    <span className="ml-2 text-sm text-green-600">+124 this month</span>
                  </div>
                  <div className="mt-4 h-16 flex items-end">
                    {/* Simple bar chart visualization */}
                    <div className="w-1/12 bg-indigo-200 rounded-t h-4 mx-px"></div>
                    <div className="w-1/12 bg-indigo-300 rounded-t h-6 mx-px"></div>
                    <div className="w-1/12 bg-indigo-400 rounded-t h-8 mx-px"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-10 mx-px"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-9 mx-px"></div>
                    <div className="w-1/12 bg-indigo-600 rounded-t h-12 mx-px"></div>
                    <div className="w-1/12 bg-indigo-600 rounded-t h-11 mx-px"></div>
                    <div className="w-1/12 bg-indigo-700 rounded-t h-14 mx-px"></div>
                    <div className="w-1/12 bg-indigo-700 rounded-t h-13 mx-px"></div>
                    <div className="w-1/12 bg-indigo-800 rounded-t h-16 mx-px"></div>
                    <div className="w-1/12 bg-indigo-800 rounded-t h-15 mx-px"></div>
                    <div className="w-1/12 bg-indigo-900 rounded-t h-12 mx-px"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Connected Biobanks</h3>
                    <span className="text-xs text-gray-400">8 active</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">8</span>
                    <span className="ml-2 text-sm text-blue-600">Tier 1 network</span>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-medium">MC</div>
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs font-medium">JH</div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-medium">ST</div>
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs font-medium">UC</div>
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-medium">NY</div>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 text-xs font-medium">BW</div>
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-800 text-xs font-medium">CL</div>
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 text-xs font-medium">MS</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Average Response Time</h3>
                    <span className="text-xs text-gray-400">For sample requests</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">48 hrs</span>
                    <span className="ml-2 text-sm text-green-600">-82% vs. industry avg.</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Typical request timeline:</div>
                    <div className="relative">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div className="w-1/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        <div className="w-1/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                        <div className="w-2/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                      </div>
                      <div className="flex text-xs mt-1 justify-between">
                        <span>Search</span>
                        <span>Approval</span>
                        <span>Delivery</span>
                        <span>Receipt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Specimen Distribution by Type</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SpecimenTypeCard type="Tumor Tissue" count={1248} color="bg-red-100" icon="🧫" percent={23.6} change="+5.2%" />
                <SpecimenTypeCard type="Normal Tissue" count={945} color="bg-green-100" icon="🧬" percent={17.9} change="+2.8%" />
                <SpecimenTypeCard type="Blood Samples" count={1865} color="bg-blue-100" icon="🩸" percent={35.3} change="+8.5%" />
                <SpecimenTypeCard type="Plasma/Serum" count={1226} color="bg-purple-100" icon="💉" percent={23.2} change="+4.1%" />
              </div>
              
              <div className="text-right">
                <Link href="/researcher/analytics" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View detailed analytics →
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'distribution' && (
            <div>
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Demographic Distribution</h3>
                  <p className="text-sm text-gray-500">Population breakdown of available samples</p>
                </div>
                <div className="flex space-x-2">
                  <select className="rounded-md border-gray-300 text-sm">
                    <option>All Biobanks</option>
                    <option>Mayo Clinic</option>
                    <option>Johns Hopkins</option>
                    <option>Stanford Medical</option>
                  </select>
                  <select className="rounded-md border-gray-300 text-sm">
                    <option>All Sample Types</option>
                    <option>Tumor Tissue</option>
                    <option>Normal Tissue</option>
                    <option>Blood Samples</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Age Distribution */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Age Distribution</h4>
                  <div className="h-60 flex items-end space-x-2">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-200 rounded-t h-12"></div>
                      <div className="text-xs mt-1">0-18</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-300 rounded-t h-24"></div>
                      <div className="text-xs mt-1">19-30</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-400 rounded-t h-36"></div>
                      <div className="text-xs mt-1">31-45</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-500 rounded-t h-48"></div>
                      <div className="text-xs mt-1">46-60</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-600 rounded-t h-60"></div>
                      <div className="text-xs mt-1">61-75</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-700 rounded-t h-40"></div>
                      <div className="text-xs mt-1">76+</div>
                    </div>
                  </div>
                </div>
                
                {/* Gender Distribution */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Gender Distribution</h4>
                  <div className="flex h-60">
                    <div className="w-1/2 flex flex-col items-center justify-end">
                      <div className="text-sm font-medium mb-2">48.3%</div>
                      <div className="w-24 bg-blue-500 rounded-t" style={{ height: '65%' }}></div>
                      <div className="mt-2 text-sm">Male</div>
                      <div className="text-xs text-gray-500">2,552 samples</div>
                    </div>
                    <div className="w-1/2 flex flex-col items-center justify-end">
                      <div className="text-sm font-medium mb-2">51.7%</div>
                      <div className="w-24 bg-pink-500 rounded-t" style={{ height: '70%' }}></div>
                      <div className="mt-2 text-sm">Female</div>
                      <div className="text-xs text-gray-500">2,732 samples</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 mb-6">
                {/* Ethnicity Distribution */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Ethnicity Distribution</h4>
                  <div className="h-20">
                    <div className="h-8 w-full flex rounded-md overflow-hidden">
                      <div className="bg-indigo-800 h-full" style={{ width: '58.2%' }}></div>
                      <div className="bg-indigo-600 h-full" style={{ width: '18.4%' }}></div>
                      <div className="bg-indigo-500 h-full" style={{ width: '12.3%' }}></div>
                      <div className="bg-indigo-400 h-full" style={{ width: '5.8%' }}></div>
                      <div className="bg-indigo-300 h-full" style={{ width: '3.2%' }}></div>
                      <div className="bg-indigo-200 h-full" style={{ width: '2.1%' }}></div>
                    </div>
                    <div className="mt-4 grid grid-cols-6 text-xs">
                      <div>
                        <div className="h-3 w-3 bg-indigo-800 rounded-sm inline-block"></div>
                        <span className="ml-1">Caucasian (58.2%)</span>
                      </div>
                      <div>
                        <div className="h-3 w-3 bg-indigo-600 rounded-sm inline-block"></div>
                        <span className="ml-1">African (18.4%)</span>
                      </div>
                      <div>
                        <div className="h-3 w-3 bg-indigo-500 rounded-sm inline-block"></div>
                        <span className="ml-1">Hispanic (12.3%)</span>
                      </div>
                      <div>
                        <div className="h-3 w-3 bg-indigo-400 rounded-sm inline-block"></div>
                        <span className="ml-1">Asian (5.8%)</span>
                      </div>
                      <div>
                        <div className="h-3 w-3 bg-indigo-300 rounded-sm inline-block"></div>
                        <span className="ml-1">Other (3.2%)</span>
                      </div>
                      <div>
                        <div className="h-3 w-3 bg-indigo-200 rounded-sm inline-block"></div>
                        <span className="ml-1">Unknown (2.1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'network' && (
            <div>
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Biobank Network</h3>
                  <p className="text-sm text-gray-500">Connected specimen repositories across institutions</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <div className="h-80 relative bg-gray-50 rounded-lg flex items-center justify-center">
                  {/* This would be a map in a real implementation */}
                  <div className="text-center">
                    <svg className="h-60 w-60 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div className="text-sm text-gray-600 mt-2">Interactive biobank network map</div>
                  </div>
                  
                  {/* Map connection points would be rendered here */}
                  <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-blue-500 rounded-full pulse-blue"></div>
                  <div className="absolute top-1/3 right-1/4 h-4 w-4 bg-green-500 rounded-full pulse-green"></div>
                  <div className="absolute bottom-1/4 right-1/3 h-4 w-4 bg-purple-500 rounded-full pulse-purple"></div>
                  <div className="absolute bottom-1/3 left-1/4 h-4 w-4 bg-red-500 rounded-full pulse-red"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <BiobankCard name="Mayo Clinic Biobank" location="Rochester, MN" count={1250} type="Academic" />
                <BiobankCard name="Johns Hopkins Biorepository" location="Baltimore, MD" count={980} type="Academic" />
                <BiobankCard name="Stanford Medical Biobank" location="Palo Alto, CA" count={845} type="Academic" />
                <BiobankCard name="UCSF Tissue Repository" location="San Francisco, CA" count={720} type="Academic" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Search Section */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-6">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Intelligent Sample Search</h2>
          
          <div className="flex mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by condition, diagnosis, tissue type, or demographic (e.g., 'lung cancer tissue from female patients over 50')"
              />
            </div>
            <div className="ml-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Advanced Filters
              </button>
            </div>
          </div>
          
          {/* Search suggestions */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Popular searches:</div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800">Tumor tissue samples</button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800">Blood samples with diabetes</button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800">Lung cancer biopsies</button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800">Healthy controls, 40-60 years</button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800">FFPE preserved samples</button>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/researcher/search" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Open Advanced Search
            </Link>
          </div>
        </div>
      </div>

      {/* Active Research Projects */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Research Projects</h2>
          <Link href="/researcher/projects/new" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            + New Project
          </Link>
        </div>
        <div className="p-6">
          <div className="divide-y divide-gray-200">
            <ProjectCard 
              name="Oncology Biomarkers Study"
              status="Active"
              samples={12}
              description="Investigating novel biomarkers for early cancer detection in high-risk populations"
              lastUpdated="Updated 2 days ago"
            />
            <ProjectCard 
              name="Diabetes Genetics Research"
              status="Active"
              samples={8}
              description="Exploring genetic factors contributing to Type 2 Diabetes in diverse ethnic groups"
              lastUpdated="Updated 1 week ago"
            />
            <ProjectCard 
              name="Cardiovascular Tissue Analysis"
              status="Draft"
              samples={0}
              description="Planned study on tissue samples from patients with advanced heart disease"
              lastUpdated="Created 3 weeks ago"
            />
          </div>
          <div className="mt-6 text-center">
            <Link href="/researcher/projects" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all research projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components

function SpecimenTypeCard({ type, count, color, icon, percent, change }) {
  return (
    <div className={`${color} p-4 rounded-lg`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl">{icon}</div>
        <div className="text-xs font-medium text-gray-600">{percent}% of total</div>
      </div>
      <h4 className="font-medium text-gray-900">{type}</h4>
      <div className="mt-2 flex justify-between items-baseline">
        <div className="text-2xl font-bold">{count.toLocaleString()}</div>
        <div className="text-xs text-green-600">{change}</div>
      </div>
    </div>
  );
}

function BiobankCard({ name, location, count, type }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2">
          🏥
        </div>
        <h4 className="font-medium text-gray-900 truncate">{name}</h4>
      </div>
      <div className="text-sm text-gray-500">{location}</div>
      <div className="text-sm text-gray-500">{type} Institution</div>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm font-medium">{count.toLocaleString()} specimens</div>
        <button className="text-xs text-indigo-600 hover:text-indigo-800">
          View details →
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ name, status, samples, description, lastUpdated }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">
          <span className="font-medium">{samples}</span> samples associated
        </div>
        <div className="text-gray-400">{lastUpdated}</div>
      </div>
    </div>
  );
}