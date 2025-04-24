'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Draft' | 'Completed' | 'On Hold';
  specimens: number;
  createdAt: string;
  lastUpdated: string;
  team: string[];
  progress: number;
  primaryInvestigator: string;
};

export default function ResearcherProjects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects([
        {
          id: 'proj-1',
          name: 'Oncology Biomarkers Study',
          description: 'Investigating novel biomarkers for early cancer detection in high-risk populations.',
          status: 'Active',
          specimens: 12,
          createdAt: '2023-05-15',
          lastUpdated: '2023-06-10',
          team: ['Dr. Jane Smith', 'Dr. Michael Chen', 'Dr. Priya Patel'],
          progress: 65,
          primaryInvestigator: 'Dr. Jane Smith'
        },
        {
          id: 'proj-2',
          name: 'Diabetes Genetics Research',
          description: 'Exploring genetic factors in Type 2 Diabetes across diverse ethnic populations.',
          status: 'Active',
          specimens: 8,
          createdAt: '2023-04-22',
          lastUpdated: '2023-05-30',
          team: ['Dr. Robert Johnson', 'Dr. Lisa Wang'],
          progress: 40,
          primaryInvestigator: 'Dr. Robert Johnson'
        },
        {
          id: 'proj-3',
          name: 'Cardiovascular Disease Analysis',
          description: 'Studying biomarkers associated with cardiovascular disease progression in patients over 60.',
          status: 'Draft',
          specimens: 0,
          createdAt: '2023-06-05',
          lastUpdated: '2023-06-05',
          team: ['Dr. Sarah Miller'],
          progress: 10,
          primaryInvestigator: 'Dr. Sarah Miller'
        },
        {
          id: 'proj-4',
          name: 'Alzheimer\'s Genetic Markers',
          description: 'Identifying genetic markers associated with early-onset Alzheimer\'s disease.',
          status: 'Completed',
          specimens: 15,
          createdAt: '2022-11-12',
          lastUpdated: '2023-04-30',
          team: ['Dr. James Wilson', 'Dr. Maria Rodriguez', 'Dr. Thomas Lee'],
          progress: 100,
          primaryInvestigator: 'Dr. James Wilson'
        },
        {
          id: 'proj-5',
          name: 'Pediatric Leukemia Treatment Response',
          description: 'Analyzing treatment response biomarkers in pediatric leukemia patients.',
          status: 'On Hold',
          specimens: 7,
          createdAt: '2023-02-18',
          lastUpdated: '2023-05-10',
          team: ['Dr. Emily Johnson', 'Dr. David Kim'],
          progress: 35,
          primaryInvestigator: 'Dr. Emily Johnson'
        }
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.primaryInvestigator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Projects</h1>
          <p className="text-sm text-gray-500">
            Manage your specimen research projects
          </p>
        </div>
        <div>
          <Link
            href="/researcher/projects/new"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Project
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusFilter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('Active')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusFilter === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setStatusFilter('Draft')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusFilter === 'Draft' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Draft
            </button>
            <button 
              onClick={() => setStatusFilter('Completed')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusFilter === 'Completed' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setStatusFilter('On Hold')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusFilter === 'On Hold' 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              On Hold
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-indigo-600 animate-[spin_1s_linear_infinite] rounded-full absolute top-0 left-0"></div>
          </div>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => router.push(`/researcher/projects/${project.id}`)}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                      <span className={`ml-3 px-2.5 py-0.5 text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {project.description}
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
                
                <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex flex-col md:flex-row md:space-x-6 mb-2 md:mb-0">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">PI:</span> {project.primaryInvestigator}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Team size:</span> {project.team.length}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Specimens:</span> {project.specimens}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Last updated:</span> {project.lastUpdated}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                <Link
                  href={`/researcher/projects/${project.id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new project.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                href="/researcher/projects/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create New Project
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}