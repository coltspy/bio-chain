'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { SearchResult } from '@/types';

export default function SpecimenSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  // States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecimens, setSelectedSpecimens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    sampleTypes: [] as string[],
    ageRanges: [] as string[],
    genders: [] as string[],
    diagnoses: [] as string[],
    preservation: [] as string[]
  });

  // Perform search with current query
  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // The API endpoint should be at /api/search
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Invalid response' }));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Run search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      performSearch();
    }
  }, [initialQuery]);

  // Toggle specimen selection
  const toggleSelection = (id: string) => {
    setSelectedSpecimens(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Toggle filter
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const updated = {...prev};
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(item => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sampleTypes: [],
      ageRanges: [],
      genders: [],
      diagnoses: [],
      preservation: []
    });
    setSearchQuery('');
  };

  // Count total active filters
  const activeFilterCount = Object.values(filters).flat().length;

  // Filter results based on selected filters
  const filteredResults = searchResults.filter(specimen => {
    // Filter by tab
    if (activeTab === 'tissue' && !specimen.type.includes('Tissue')) return false;
    if (activeTab === 'blood' && !specimen.type.includes('Blood')) return false;
    if (activeTab === 'plasma' && !(specimen.type.includes('Plasma') || specimen.type.includes('Serum'))) return false;
    
    // Filter by selected filters
    if (filters.sampleTypes.length && !filters.sampleTypes.some(type => specimen.type.includes(type))) return false;
    if (filters.genders.length && !filters.genders.includes(specimen.gender)) return false;
    if (filters.preservation.length && !filters.preservation.includes(specimen.preservation_method)) return false;
    
    // Filter by diagnosis category
    if (filters.diagnoses.length) {
      const diagLower = specimen.diagnosis.toLowerCase();
      if (!filters.diagnoses.some(diag => diagLower.includes(diag))) return false;
    }
    
    // Filter by age range (simplified for demo)
    if (filters.ageRanges.length) {
      const age = specimen.age_at_collection;
      let matches = false;
      
      filters.ageRanges.forEach(range => {
        if (range === '18-45' && age >= 18 && age <= 45) matches = true;
        if (range === '46-65' && age >= 46 && age <= 65) matches = true;
        if (range === '66+' && age >= 66) matches = true;
      });
      
      if (!matches) return false;
    }
    
    return true;
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    
    // Update URL with query
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    router.push(`/researcher/search?${params.toString()}`);
  };

  // Filter options for the filter panel
  const filterOptions = {
    sampleTypes: [
      { id: 'tumor-tissue', label: 'Tumor Tissue', value: 'Tumor Tissue' },
      { id: 'normal-tissue', label: 'Normal Tissue', value: 'Normal Tissue' },
      { id: 'blood', label: 'Blood Samples', value: 'Blood' },
      { id: 'plasma', label: 'Plasma', value: 'Plasma' },
      { id: 'serum', label: 'Serum', value: 'Serum' }
    ],
    ageRanges: [
      { id: 'age-18-45', label: '18-45 years', value: '18-45' },
      { id: 'age-46-65', label: '46-65 years', value: '46-65' },
      { id: 'age-66+', label: '66+ years', value: '66+' }
    ],
    genders: [
      { id: 'gender-male', label: 'Male', value: 'Male' },
      { id: 'gender-female', label: 'Female', value: 'Female' }
    ],
    diagnoses: [
      { id: 'diagnosis-cancer', label: 'Cancer (all types)', value: 'cancer' },
      { id: 'diagnosis-diabetes', label: 'Diabetes', value: 'diabetes' },
      { id: 'diagnosis-cardiovascular', label: 'Cardiovascular', value: 'cardiovascular' }
    ],
    preservation: [
      { id: 'preservation-ffpe', label: 'FFPE', value: 'FFPE' },
      { id: 'preservation-frozen', label: 'Frozen', value: 'Frozen' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Specimen Search</h1>
        <p className="text-sm text-gray-500">
          Search across biospecimens from connected biobanks
        </p>
      </header>

      {/* Search Form - Natural Language Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search in natural language (e.g., 'blood samples from diabetic patients over 60')"
            />
          </div>
          <div className="ml-4">
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                activeFilterCount > 0
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
          <div className="ml-2">
            <button 
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      
      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow mb-6 p-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filter Specimens</h3>
            <button 
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample Types */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Type</h4>
              <div className="space-y-2">
                {filterOptions.sampleTypes.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      type="checkbox"
                      checked={filters.sampleTypes.includes(option.value)}
                      onChange={() => toggleFilter('sampleTypes', option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Demographics */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Demographics</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Age Range</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.ageRanges.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          checked={filters.ageRanges.includes(option.value)}
                          onChange={() => toggleFilter('ageRanges', option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Gender</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.genders.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          checked={filters.genders.includes(option.value)}
                          onChange={() => toggleFilter('genders', option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Clinical */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Clinical</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Diagnosis</h5>
                  <div className="space-y-2">
                    {filterOptions.diagnoses.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          checked={filters.diagnoses.includes(option.value)}
                          onChange={() => toggleFilter('diagnoses', option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Preservation Method</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.preservation.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          checked={filters.preservation.includes(option.value)}
                          onChange={() => toggleFilter('preservation', option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Result Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { key: 'all', label: 'All Specimens', count: 5284 },
              { key: 'tissue', label: 'Tissue', count: 2193 },
              { key: 'blood', label: 'Blood', count: 1865 },
              { key: 'plasma', label: 'Plasma/Serum', count: 1226 }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap py-4 px-6 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className="ml-2 py-0.5 px-2 text-xs font-medium rounded-full bg-gray-100">
                  {tab.count.toLocaleString()}
                </span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4">
          {/* Search result info & sorting */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
            <div>
              {isLoading ? (
                "Searching..."
              ) : filteredResults.length > 0 ? (
                `Found ${filteredResults.length} specimens`
              ) : searchQuery ? (
                "No specimens found"
              ) : (
                "Enter a search query to find specimens"
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <span>Sort by:</span>
              <select className="border-gray-300 rounded-md text-sm">
                <option>Relevance</option>
                <option>Newest first</option>
                <option>Similarity</option>
              </select>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map((specimen) => (
                <SpecimenCard 
                  key={specimen.id} 
                  specimen={specimen}
                  isSelected={selectedSpecimens.includes(specimen.id)}
                  onToggleSelect={() => toggleSelection(specimen.id)}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No matching specimens</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter parameters.</p>
              <div className="mt-6">
                <button 
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Search specimens</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try searching with natural language like "blood samples from diabetic patients" or "tumor tissue preserved with FFPE"
              </p>
            </div>
          )}
        </div>
        
        {filteredResults.length > 0 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredResults.length} results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-400 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-indigo-500 bg-indigo-50 text-indigo-600 rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SpecimenCard Component
interface SpecimenCardProps {
  specimen: SearchResult;
  isSelected: boolean;
  onToggleSelect: () => void;
}

function SpecimenCard({ specimen, isSelected, onToggleSelect }: SpecimenCardProps) {
  // Determine background color based on type
  const getTypeColor = (type: string): string => {
    if (type.includes('Tumor')) return 'bg-red-100';
    if (type.includes('Normal')) return 'bg-green-100';
    if (type.includes('Blood')) return 'bg-blue-100';
    if (type.includes('Plasma')) return 'bg-purple-100';
    if (type.includes('Serum')) return 'bg-indigo-100';
    return 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className={`p-4 ${getTypeColor(specimen.type)} relative`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">{specimen.type}</h3>
        </div>
        <div className="absolute top-4 right-4">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
          />
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between text-xs mb-3">
          <span className="text-gray-600">{specimen.biobank || specimen.biobank_id}</span>
          <span className="text-gray-800">ID: {specimen.external_id}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <div className="text-gray-500">Gender</div>
            <div>{specimen.gender}</div>
          </div>
          <div>
            <div className="text-gray-500">Age</div>
            <div>{specimen.age_at_collection} years</div>
          </div>
          <div>
            <div className="text-gray-500">Diagnosis</div>
            <div className="truncate">{specimen.diagnosis}</div>
          </div>
          <div>
            <div className="text-gray-500">Preservation</div>
            <div>{specimen.preservation_method}</div>
          </div>
        </div>
        
        {specimen.similarity !== undefined && (
          <div className="text-xs mb-3">
            <div className="text-gray-500">Similarity</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${(specimen.similarity * 100).toFixed(0)}%` }}
              ></div>
            </div>
            <div className="text-right text-gray-500 mt-1">{(specimen.similarity * 100).toFixed(0)}%</div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <button className="text-xs font-medium text-gray-700 hover:text-gray-900">
            View Details
          </button>
          <button 
            onClick={onToggleSelect}
            className={`inline-flex items-center px-3 py-1.5 border ${
              isSelected 
                ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100' 
                : 'border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
            } rounded-md text-xs font-medium`}
          >
            {isSelected ? 'Remove' : 'Add to inquiry'}
          </button>
        </div>
      </div>
    </div>
  );
}