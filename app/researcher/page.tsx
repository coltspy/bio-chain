'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SampleType = 'Tumor Tissue' | 'Normal Tissue' | 'Blood' | 'Plasma/Serum';
type Project = {
  id: string;
  name: string;
  status: 'Active' | 'Draft' | 'Completed';
  sampleCount: number;
  description: string;
  lastUpdated: string;
};

const ResearcherDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demographics' | 'biobanks'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const sampleDistribution = [
    { type: 'Tumor Tissue', count: 1248, percent: 23.6, change: '+5.2%' },
    { type: 'Normal Tissue', count: 945, percent: 17.9, change: '+2.8%' },
    { type: 'Blood', count: 1865, percent: 35.3, change: '+8.5%' },
    { type: 'Plasma/Serum', count: 1226, percent: 23.2, change: '+4.1%' }
  ];

  const biobanks = [
    { name: 'Mayo Clinic', location: 'Rochester, MN', sampleCount: 1250 },
    { name: 'Johns Hopkins', location: 'Baltimore, MD', sampleCount: 980 },
    { name: 'Stanford Medical', location: 'Palo Alto, CA', sampleCount: 845 },
    { name: 'UCSF Repository', location: 'San Francisco, CA', sampleCount: 720 }
  ];

  const recentProjects: Project[] = [
    {
      id: 'proj-1',
      name: 'Oncology Biomarkers Study',
      status: 'Active',
      sampleCount: 12,
      description: 'Investigating novel biomarkers for early cancer detection',
      lastUpdated: '2 days ago'
    },
    {
      id: 'proj-2',
      name: 'Diabetes Genetics Research',
      status: 'Active',
      sampleCount: 8,
      description: 'Exploring genetic factors in Type 2 Diabetes',
      lastUpdated: '1 week ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Specimen Center</h1>
        <p className="text-sm text-gray-500">Global biospecimen discovery platform</p>
      </header>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This is a demonstration of the AminoChain Specimen Center platform.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { key: 'overview', label: 'Specimen Overview' },
              { key: 'demographics', label: 'Demographics' },
              { key: 'biobanks', label: 'Biobank Network' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                      title="Total Specimens"
                      value="5,284"
                      subtext="+124 this month"
                    />
                    <StatCard
                      title="Connected Biobanks"
                      value="8"
                      subtext="Tier 1 research network"
                    />
                    <StatCard
                      title="Avg. Response Time"
                      value="48 hrs"
                      subtext="-82% vs. industry avg."
                    />
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-4">Specimen Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {sampleDistribution.map(item => (
                      <SampleTypeCard key={item.type} {...item} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'demographics' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Age Distribution</h4>
                      <div className="h-52 flex items-end space-x-2">
                        {[
                          { label: '0-18', height: 'h-12' },
                          { label: '19-30', height: 'h-20' },
                          { label: '31-45', height: 'h-32' },
                          { label: '46-60', height: 'h-40' },
                          { label: '61-75', height: 'h-52' },
                          { label: '76+', height: 'h-36' }
                        ].map((age, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className={`w-full bg-blue-300 hover:bg-blue-400 rounded-t ${age.height}`}></div>
                            <div className="text-xs mt-1">{age.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Gender Distribution</h4>
                      <div className="flex h-52">
                        <div className="w-1/2 flex flex-col items-center justify-end">
                          <div className="text-sm font-medium mb-2">48.3%</div>
                          <div className="w-20 bg-blue-500 rounded-t h-32"></div>
                          <div className="mt-2 text-sm">Male</div>
                          <div className="text-xs text-gray-500">2,552 samples</div>
                        </div>
                        <div className="w-1/2 flex flex-col items-center justify-end">
                          <div className="text-sm font-medium mb-2">51.7%</div>
                          <div className="w-20 bg-pink-500 rounded-t h-36"></div>
                          <div className="mt-2 text-sm">Female</div>
                          <div className="text-xs text-gray-500">2,732 samples</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'biobanks' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {biobanks.map((bank, i) => (
                      <BiobankCard key={i} {...bank} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Sample Search</h2>
        
        <div className="flex mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by condition, tissue type, etc. (e.g., 'lung cancer tissue from female patients over 50')"
            />
          </div>
          <div className="ml-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/researcher/search" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Advanced Search
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Research Projects</h2>
          <Link href="/researcher/projects/new" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            + New Project
          </Link>
        </div>
        <div className="divide-y divide-gray-200 p-6">
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}

          <div className="pt-4 text-center">
            <Link href="/researcher/projects" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className="ml-2 text-sm text-green-600">{subtext}</span>
    </div>
  </div>
);

const SampleTypeCard = ({ type, count, percent, change }: { type: string; count: number; percent: number; change: string }) => {
  const getColor = (type: string): string => {
    if (type.includes('Tumor')) return 'bg-red-100';
    if (type.includes('Normal')) return 'bg-green-100';
    if (type.includes('Blood')) return 'bg-blue-100';
    return 'bg-purple-100';
  };
  
  const getIcon = (type: string): string => {
    if (type.includes('Tumor')) return '🧫';
    if (type.includes('Normal')) return '🧬';
    if (type.includes('Blood')) return '🩸';
    return '💉';
  };

  return (
    <div className={`${getColor(type)} p-4 rounded-lg hover:shadow-md cursor-pointer`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl">{getIcon(type)}</div>
        <div className="text-xs font-medium text-gray-600">{percent}% of total</div>
      </div>
      <h4 className="font-medium text-gray-900">{type}</h4>
      <div className="mt-2 flex justify-between items-baseline">
        <div className="text-2xl font-bold">{count.toLocaleString()}</div>
        <div className="text-xs text-green-600">{change}</div>
      </div>
    </div>
  );
};

const BiobankCard = ({ name, location, sampleCount }: { name: string; location: string; sampleCount: number }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center mb-2">
      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2">
        🏥
      </div>
      <h4 className="font-medium text-gray-900 truncate">{name}</h4>
    </div>
    <div className="text-sm text-gray-500">{location}</div>
    <div className="mt-2 flex justify-between items-center">
      <div className="text-sm font-medium">{sampleCount.toLocaleString()} specimens</div>
      <button className="text-xs text-indigo-600 hover:text-indigo-800">
        View details →
      </button>
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="py-4 first:pt-0 hover:bg-gray-50 transition-colors rounded-lg px-2">
    <div className="flex justify-between items-center mb-1">
      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
      <span className={`px-2 py-1 text-xs rounded-full ${
        project.status === 'Active' ? 'bg-green-100 text-green-800' : 
        project.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {project.status}
      </span>
    </div>
    <p className="text-sm text-gray-500 mb-2">{project.description}</p>
    <div className="flex justify-between items-center text-sm">
      <div className="text-gray-500">
        <span className="font-medium">{project.sampleCount}</span> samples associated
      </div>
      <div className="text-gray-400">Updated {project.lastUpdated}</div>
    </div>
  </div>
);

export default ResearcherDashboard;