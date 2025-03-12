'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Biobank = {
  id: string;
  name: string;
  location: string;
  institutionType: string;
  specimenCount: number;
  cancerTypes?: string[];
  diagnostics?: string[];
  availableTypes?: string[];
  description?: string;
  featured?: boolean;
};

export default function BiobankDirectoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [biobanks, setBiobanks] = useState<Biobank[]>([]);
  const [filteredBiobanks, setFilteredBiobanks] = useState<Biobank[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const mockBiobanks: Biobank[] = [
        {
          id: 'biobank-1',
          name: 'Mayo Clinic Biobank',
          location: 'Rochester, MN',
          institutionType: 'Research Hospital',
          specimenCount: 1250,
          cancerTypes: ['Lung', 'Breast', 'Colorectal', 'Pancreatic', 'Brain'],
          availableTypes: ['Tumor Tissue', 'Normal Tissue', 'Blood', 'Plasma', 'Serum'],
          description: 'The Mayo Clinic Biobank is a collection of samples, including blood and blood derivatives, and health information donated by Mayo Clinic patients.',
          featured: true
        },
        {
          id: 'biobank-2',
          name: 'Johns Hopkins Biorepository',
          location: 'Baltimore, MD',
          institutionType: 'Research Hospital',
          specimenCount: 980,
          cancerTypes: ['Breast', 'Prostate', 'Colorectal', 'Leukemia'],
          availableTypes: ['Tumor Tissue', 'Normal Tissue', 'Blood', 'Bone Marrow'],
          description: 'Johns Hopkins Biorepository provides high-quality biospecimens to support research efforts across a wide range of disease areas.',
          featured: true
        },
        {
          id: 'biobank-3',
          name: 'Stanford Medical Biobank',
          location: 'Palo Alto, CA',
          institutionType: 'Research Hospital',
          specimenCount: 845,
          cancerTypes: ['Breast', 'Lung', 'Melanoma', 'Lymphoma'],
          availableTypes: ['Tumor Tissue', 'Normal Tissue', 'Blood', 'Plasma'],
          description: 'Stanford Medical Biobank collects and stores high-quality biospecimens for research and clinical applications.'
        },
        {
          id: 'biobank-4',
          name: 'UCSF Repository',
          location: 'San Francisco, CA',
          institutionType: 'University',
          specimenCount: 720,
          diagnostics: ['Alzheimer\'s', 'Parkinson\'s', 'Multiple Sclerosis'],
          availableTypes: ['Brain Tissue', 'CSF', 'Blood', 'Plasma'],
          description: 'UCSF Repository specializes in neurodegenerative disease biospecimens for advancing research in brain disorders.'
        },
        {
          id: 'biobank-5',
          name: 'Harvard Biobank',
          location: 'Boston, MA',
          institutionType: 'University',
          specimenCount: 650,
          diagnostics: ['Diabetes', 'Cardiovascular Disease', 'Autoimmune Disorders'],
          availableTypes: ['Blood', 'Plasma', 'Serum', 'Tissue Biopsies'],
          description: 'Harvard Biobank provides biospecimens to researchers studying a range of chronic diseases.'
        },
        {
          id: 'biobank-6',
          name: 'MD Anderson Cancer Biobank',
          location: 'Houston, TX',
          institutionType: 'Cancer Center',
          specimenCount: 1120,
          cancerTypes: ['Breast', 'Lung', 'Colorectal', 'Pancreatic', 'Melanoma', 'Leukemia', 'Lymphoma'],
          availableTypes: ['Tumor Tissue', 'Normal Tissue', 'Blood', 'Plasma', 'Bone Marrow'],
          description: 'MD Anderson Cancer Biobank focuses exclusively on cancer-related biospecimens to accelerate oncology research.',
          featured: true
        },
        {
          id: 'biobank-7',
          name: 'Cleveland Clinic Biobank',
          location: 'Cleveland, OH',
          institutionType: 'Research Hospital',
          specimenCount: 890,
          diagnostics: ['Cardiovascular Disease', 'Neurological Disorders', 'Autoimmune Disorders'],
          availableTypes: ['Blood', 'Plasma', 'Serum', 'Tissue Biopsies', 'CSF'],
          description: 'Cleveland Clinic Biobank specializes in cardiovascular and immunological specimens for clinical research.'
        },
        {
          id: 'biobank-8',
          name: 'NIH Biorepository',
          location: 'Bethesda, MD',
          institutionType: 'Government',
          specimenCount: 1540,
          diagnostics: ['Rare Diseases', 'Genetic Disorders', 'Infectious Diseases'],
          availableTypes: ['Blood', 'Tissue', 'DNA', 'Cell Lines', 'Plasma'],
          description: 'The NIH Biorepository is a national resource for biospecimens supporting federally-funded research initiatives.',
          featured: true
        },
        {
          id: 'biobank-9',
          name: 'UK Biobank',
          location: 'Manchester, UK',
          institutionType: 'International Repository',
          specimenCount: 2200,
          diagnostics: ['Population Health', 'Genetic Studies', 'Longitudinal Studies'],
          availableTypes: ['Blood', 'Urine', 'Saliva', 'DNA', 'Tissue'],
          description: 'UK Biobank is a large-scale biomedical database and research resource containing genetic and health information from half a million UK participants.',
          featured: true
        },
        {
          id: 'biobank-10',
          name: 'Memorial Sloan Kettering Biobank',
          location: 'New York, NY',
          institutionType: 'Cancer Center',
          specimenCount: 970,
          cancerTypes: ['Breast', 'Prostate', 'Lung', 'Ovarian', 'Lymphoma', 'Sarcoma'],
          availableTypes: ['Tumor Tissue', 'Normal Tissue', 'Blood', 'Bone Marrow', 'Plasma'],
          description: 'Memorial Sloan Kettering Biobank provides high-quality biospecimens for cancer research and precision medicine development.'
        }
      ];
      
      setBiobanks(mockBiobanks);
      setFilteredBiobanks(mockBiobanks);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter biobanks based on search query and active filter
  useEffect(() => {
    if (biobanks.length) {
      let filtered = [...biobanks];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(biobank => 
          biobank.name.toLowerCase().includes(query) ||
          biobank.location.toLowerCase().includes(query) ||
          biobank.institutionType.toLowerCase().includes(query) ||
          biobank.description?.toLowerCase().includes(query) ||
          biobank.cancerTypes?.some(type => type.toLowerCase().includes(query)) ||
          biobank.diagnostics?.some(type => type.toLowerCase().includes(query)) ||
          biobank.availableTypes?.some(type => type.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (activeFilter !== 'all') {
        if (activeFilter === 'featured') {
          filtered = filtered.filter(biobank => biobank.featured);
        } else if (activeFilter === 'cancer') {
          filtered = filtered.filter(biobank => biobank.cancerTypes && biobank.cancerTypes.length > 0);
        } else if (activeFilter === 'neuro') {
          filtered = filtered.filter(biobank => 
            biobank.diagnostics && biobank.diagnostics.some(d => 
              ['Alzheimer\'s', 'Parkinson\'s', 'Multiple Sclerosis', 'Neurological'].some(term => 
                d.includes(term)
              )
            )
          );
        } else if (activeFilter === 'cardio') {
          filtered = filtered.filter(biobank => 
            biobank.diagnostics && biobank.diagnostics.some(d => 
              ['Cardiovascular', 'Heart', 'Hypertension'].some(term => 
                d.includes(term)
              )
            )
          );
        } else if (activeFilter === 'genetic') {
          filtered = filtered.filter(biobank => 
            biobank.diagnostics && biobank.diagnostics.some(d => 
              ['Genetic', 'Rare', 'Inherited'].some(term => 
                d.includes(term)
              )
            )
          );
        }
      }
      
      setFilteredBiobanks(filtered);
    }
  }, [searchQuery, activeFilter, biobanks]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle filter selection
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biobank Directory</h1>
          <p className="text-sm text-gray-500">
            Browse and discover biobanks in the AminoChain network
          </p>
        </div>
        <div>
          <Link 
            href="/researcher/search" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Search All Specimens
          </Link>
        </div>
      </div>
      
      {/* Search and Filters */}
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
              placeholder="Search biobanks by name, location, or specialty..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => handleFilterChange('featured')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'featured' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Featured
            </button>
            <button 
              onClick={() => handleFilterChange('cancer')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'cancer' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Cancer
            </button>
            <button 
              onClick={() => handleFilterChange('neuro')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'neuro' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Neurological
            </button>
            <button 
              onClick={() => handleFilterChange('cardio')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'cardio' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Cardiovascular
            </button>
            <button 
              onClick={() => handleFilterChange('genetic')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === 'genetic' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Genetic/Rare
            </button>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        {filteredBiobanks.length} biobanks found
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-indigo-600 animate-[spin_1s_linear_infinite] rounded-full absolute top-0 left-0"></div>
          </div>
        </div>
      ) : filteredBiobanks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No biobanks found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBiobanks.map((biobank) => (
            <div 
              key={biobank.id} 
              className={`bg-white rounded-lg shadow-sm border ${biobank.featured ? 'border-indigo-200' : 'border-gray-200'} overflow-hidden hover:shadow-md transition-shadow`}
            >
              <div className={`p-4 ${biobank.featured ? 'bg-indigo-50' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 truncate" title={biobank.name}>
                    {biobank.name}
                  </h2>
                  {biobank.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{biobank.location}</p>
              </div>
              
              <div className="px-4 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 mb-4 line-clamp-2" title={biobank.description}>
                  {biobank.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500">Institution Type</div>
                    <div className="text-sm">{biobank.institutionType}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500">Specimens</div>
                    <div className="text-sm">{biobank.specimenCount.toLocaleString()}</div>
                  </div>
                </div>
                
                {biobank.cancerTypes && biobank.cancerTypes.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Cancer Types</div>
                    <div className="flex flex-wrap gap-1">
                      {biobank.cancerTypes.slice(0, 3).map((type) => (
                        <span key={type} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          {type}
                        </span>
                      ))}
                      {biobank.cancerTypes.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{biobank.cancerTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {biobank.diagnostics && biobank.diagnostics.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Disease Focus</div>
                    <div className="flex flex-wrap gap-1">
                      {biobank.diagnostics.slice(0, 3).map((type) => (
                        <span key={type} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {type}
                        </span>
                      ))}
                      {biobank.diagnostics.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{biobank.diagnostics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {biobank.availableTypes && biobank.availableTypes.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Available Specimen Types</div>
                    <div className="flex flex-wrap gap-1">
                      {biobank.availableTypes.slice(0, 3).map((type) => (
                        <span key={type} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          {type}
                        </span>
                      ))}
                      {biobank.availableTypes.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{biobank.availableTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                <Link
                    href={`/researcher/search?biobank=${encodeURIComponent(biobank.name)}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                    Search Specimens →
                </Link>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}