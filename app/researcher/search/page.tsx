'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import debounce from 'lodash/debounce';

// Type definitions for specimens
type SearchResult = {
  id: string;
  external_id: string;
  biobank: string;
  biobank_id: string;
  type: string;
  diagnosis: string;
  gender: string;
  age_at_collection: number;
  ethnicity: string;
  preservation_method: string;
  quantity: string;
  available: boolean;
  similarity?: number;
  searchableFields?: string[];
};

type FilterState = {
  sampleTypes: string[];
  ageRanges: string[];
  genders: string[];
  diagnoses: string[];
  preservationMethods: string[];
  ethnicities: string[];
  biobanks: string[];
  availability: boolean | null;
};

export default function SpecimenSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  // Core states
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpecimens, setSelectedSpecimens] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showInquiryPanel, setShowInquiryPanel] = useState(false);
  const [semanticConditions, setSemanticConditions] = useState<any>(null);
  const [sortOption, setSortOption] = useState('relevance');
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    sampleTypes: [],
    ageRanges: [],
    genders: [],
    diagnoses: [],
    preservationMethods: [],
    ethnicities: [],
    biobanks: [],
    availability: true
  });
  
  // Filter options derived from results
  const [filterOptions, setFilterOptions] = useState({
    sampleTypes: [] as string[],
    diagnoses: [] as string[],
    biobanks: [] as string[],
    ethnicities: [] as string[]
  });
  
  // Stats
  const [stats, setStats] = useState({
    totalSpecimens: 0,
    matchedSpecimens: 0,
    biobanksRepresented: 0,
    averageAge: 0
  });
  
  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 15,
    totalResults: 0
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 500),
    []
  );

  // Search function that connects to Firebase via API route
  const performSearch = async (query: string = searchQuery) => {
    if (!query.trim() && Object.values(filters).every(f => 
      Array.isArray(f) ? f.length === 0 : f === null
    )) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          filters
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
      setFilteredResults(data.results || []);
      setPagination(prev => ({
        ...prev,
        totalResults: data.results.length,
        totalPages: Math.ceil(data.results.length / pagination.pageSize),
        currentPage: 1
      }));
      
      if (data.meta?.semanticConditions) {
        setSemanticConditions(data.meta.semanticConditions);
      }
      
      // Extract filter options from results
      if (data.results && data.results.length > 0) {
        extractFilterOptions(data.results);
        calculateStats(data.results);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setSearchResults([]);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Extract unique values for filter options
  const extractFilterOptions = (results: SearchResult[]) => {
    const sampleTypes = [...new Set(results.map(item => item.type))];
    const diagnoses = [...new Set(results.map(item => item.diagnosis))];
    const biobanks = [...new Set(results.map(item => item.biobank))];
    const ethnicities = [...new Set(results.map(item => item.ethnicity))];
    
    setFilterOptions({
      sampleTypes,
      diagnoses,
      biobanks,
      ethnicities
    });
  };
  
  // Calculate statistics based on the results
  const calculateStats = (results: SearchResult[]) => {
    const totalSpecimens = results.length;
    const biobanksRepresented = new Set(results.map(item => item.biobank_id)).size;
    const totalAge = results.reduce((sum, item) => sum + item.age_at_collection, 0);
    const averageAge = totalSpecimens ? Math.round(totalAge / totalSpecimens) : 0;
    
    setStats({
      totalSpecimens,
      matchedSpecimens: totalSpecimens,
      biobanksRepresented,
      averageAge
    });
  };

  // Run search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch]);
  
  // Apply filters and pagination
  useEffect(() => {
    if (searchResults.length > 0) {
      let results = [...searchResults];
      
      // Apply client-side filters
      if (filters.sampleTypes.length > 0) {
        results = results.filter(item => 
          filters.sampleTypes.some(type => item.type.includes(type))
        );
      }
      
      if (filters.diagnoses.length > 0) {
        results = results.filter(item => 
          filters.diagnoses.some(diagnosis => 
            item.diagnosis.toLowerCase().includes(diagnosis.toLowerCase())
          )
        );
      }
      
      if (filters.genders.length > 0) {
        results = results.filter(item => 
          filters.genders.includes(item.gender)
        );
      }
      
      if (filters.preservationMethods.length > 0) {
        results = results.filter(item => 
          filters.preservationMethods.includes(item.preservation_method)
        );
      }
      
      if (filters.ethnicities.length > 0) {
        results = results.filter(item => 
          filters.ethnicities.includes(item.ethnicity)
        );
      }
      
      if (filters.biobanks.length > 0) {
        results = results.filter(item => 
          filters.biobanks.includes(item.biobank)
        );
      }
      
      if (filters.ageRanges.length > 0) {
        results = results.filter(item => {
          return filters.ageRanges.some(range => {
            if (range === '0-18') return item.age_at_collection <= 18;
            if (range === '19-40') return item.age_at_collection >= 19 && item.age_at_collection <= 40;
            if (range === '41-65') return item.age_at_collection >= 41 && item.age_at_collection <= 65;
            if (range === '66+') return item.age_at_collection >= 66;
            return false;
          });
        });
      }
      
      if (filters.availability !== null) {
        results = results.filter(item => item.available === filters.availability);
      }
      
      // Apply sorting
      if (sortOption === 'age_asc') {
        results.sort((a, b) => a.age_at_collection - b.age_at_collection);
      } else if (sortOption === 'age_desc') {
        results.sort((a, b) => b.age_at_collection - a.age_at_collection);
      } else if (sortOption === 'relevance' && searchQuery) {
        results.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
      }
      
      setFilteredResults(results);
      setStats(prev => ({
        ...prev,
        matchedSpecimens: results.length
      }));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        totalResults: results.length,
        totalPages: Math.ceil(results.length / pagination.pageSize),
        currentPage: 1
      }));
    }
  }, [filters, searchResults, sortOption, pagination.pageSize]);
  
  // Get paginated results
  const getPaginatedResults = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredResults.slice(startIndex, endIndex);
  };

  // Toggle specimen selection
  const toggleSelection = (id: string) => {
    setSelectedSpecimens(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  // Toggle filter
  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const updated = {...prev};
      if (Array.isArray(updated[category])) {
        const arrayCategory = category as keyof Pick<FilterState, 'sampleTypes' | 'ageRanges' | 'genders' | 'diagnoses' | 'preservationMethods' | 'ethnicities' | 'biobanks'>;
        if ((updated[arrayCategory] as string[]).includes(value)) {
          updated[arrayCategory] = (updated[arrayCategory] as string[]).filter(item => item !== value);
        } else {
          updated[arrayCategory] = [...(updated[arrayCategory] as string[]), value];
        }
      }
      return updated;
    });
  };
  
  // Set availability filter
  const setAvailabilityFilter = (value: boolean | null) => {
    setFilters(prev => ({
      ...prev,
      availability: value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sampleTypes: [],
      ageRanges: [],
      genders: [],
      diagnoses: [],
      preservationMethods: [],
      ethnicities: [],
      biobanks: [],
      availability: true
    });
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.push(`/researcher/search?${params.toString()}`);
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: page
      }));
      
      // Scroll to top of results
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Calculate active filter count
  const activeFilterCount = 
    filters.sampleTypes.length +
    filters.ageRanges.length +
    filters.genders.length +
    filters.diagnoses.length +
    filters.preservationMethods.length +
    filters.ethnicities.length +
    filters.biobanks.length +
    (filters.availability !== null ? 1 : 0);
  
  // Get background color based on specimen type
  const getTypeColor = (type: string): string => {
    if (type.includes('Tumor')) return 'bg-red-100';
    if (type.includes('Normal')) return 'bg-green-100';
    if (type.includes('Blood')) return 'bg-blue-100';
    if (type.includes('Plasma')) return 'bg-purple-100';
    if (type.includes('Serum')) return 'bg-indigo-100';
    if (type.includes('CSF')) return 'bg-cyan-100';
    if (type.includes('Urine')) return 'bg-yellow-100';
    if (type.includes('Biopsy')) return 'bg-orange-100';
    if (type.includes('Brain')) return 'bg-violet-100';
    if (type.includes('Liver')) return 'bg-amber-100';
    if (type.includes('Kidney')) return 'bg-emerald-100';
    if (type.includes('Heart')) return 'bg-rose-100';
    if (type.includes('Spinal')) return 'bg-fuchsia-100';
    return 'bg-gray-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Specimen Search</h1>
        <p className="text-sm text-gray-500">
          Search across biospecimens from connected biobanks in the AminoChain network
        </p>
      </header>

      {/* Natural Language Search Form */}
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
              placeholder="Search naturally (e.g., 'blood samples from female diabetic patients over 60')"
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
      
      {/* Semantic Search Interpretation Panel */}
      {semanticConditions && Object.keys(semanticConditions).length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Search Interpretation</h3>
              <div className="mt-1 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  {semanticConditions.ageConditions?.ageMin !== null && (
                    <li>Age at least {semanticConditions.ageConditions.ageMin} years</li>
                  )}
                  {semanticConditions.ageConditions?.ageMax !== null && (
                    <li>Age no more than {semanticConditions.ageConditions.ageMax} years</li>
                  )}
                  {semanticConditions.gender && (
                    <li>Gender: {semanticConditions.gender}</li>
                  )}
                  {semanticConditions.sampleTypes.length > 0 && (
                    <li>Sample type: {semanticConditions.sampleTypes.join(', ')}</li>
                  )}
                  {semanticConditions.diagnoses.length > 0 && (
                    <li>Diagnosis: {semanticConditions.diagnoses.join(', ')}</li>
                  )}
                  {semanticConditions.preservationMethods.length > 0 && (
                    <li>Preservation: {semanticConditions.preservationMethods.join(', ')}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.sampleTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      type="checkbox"
                      checked={filters.sampleTypes.includes(type)}
                      onChange={() => toggleFilter('sampleTypes', type)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
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
                    {[
                      { id: 'age-0-18', label: '0-18 years', value: '0-18' },
                      { id: 'age-19-40', label: '19-40 years', value: '19-40' },
                      { id: 'age-41-65', label: '41-65 years', value: '41-65' },
                      { id: 'age-66+', label: '66+ years', value: '66+' }
                    ].map((option) => (
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
                    {[
                      { id: 'gender-male', label: 'Male', value: 'Male' },
                      { id: 'gender-female', label: 'Female', value: 'Female' }
                    ].map((option) => (
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
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Ethnicity</h5>
                  <div className="max-h-32 overflow-y-auto">
                    {filterOptions.ethnicities.map((ethnicity) => (
                      <div key={ethnicity} className="flex items-center">
                        <input
                          id={`ethnicity-${ethnicity}`}
                          type="checkbox"
                          checked={filters.ethnicities.includes(ethnicity)}
                          onChange={() => toggleFilter('ethnicities', ethnicity)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`ethnicity-${ethnicity}`} className="ml-2 text-sm text-gray-700">
                          {ethnicity}
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
                  <div className="max-h-32 overflow-y-auto">
                    {filterOptions.diagnoses.map((diagnosis) => (
                      <div key={diagnosis} className="flex items-center">
                        <input
                          id={`diagnosis-${diagnosis}`}
                          type="checkbox"
                          checked={filters.diagnoses.includes(diagnosis)}
                          onChange={() => toggleFilter('diagnoses', diagnosis)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`diagnosis-${diagnosis}`} className="ml-2 text-sm text-gray-700">
                          {diagnosis}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Preservation Method</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'preservation-ffpe', label: 'FFPE', value: 'FFPE' },
                      { id: 'preservation-frozen', label: 'Frozen', value: 'Frozen' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          checked={filters.preservationMethods.includes(option.value)}
                          onChange={() => toggleFilter('preservationMethods', option.value)}
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
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Biobanks</h5>
                  <div className="max-h-32 overflow-y-auto">
                    {filterOptions.biobanks.map((biobank) => (
                      <div key={biobank} className="flex items-center">
                        <input
                          id={`biobank-${biobank}`}
                          type="checkbox"
                          checked={filters.biobanks.includes(biobank)}
                          onChange={() => toggleFilter('biobanks', biobank)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`biobank-${biobank}`} className="ml-2 text-sm text-gray-700">
                          {biobank}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Availability</h5>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="availability-available"
                        type="radio"
                        checked={filters.availability === true}
                        onChange={() => setAvailabilityFilter(true)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="availability-available" className="ml-2 text-sm text-gray-700">
                        Available
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="availability-all"
                        type="radio"
                        checked={filters.availability === null}
                        onChange={() => setAvailabilityFilter(null)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="availability-all" className="ml-2 text-sm text-gray-700">
                        All
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Results Stats */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Results</h3>
              <p className="text-xl font-semibold text-gray-900">{stats.matchedSpecimens}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Biobanks</h3>
              <p className="text-xl font-semibold text-gray-900">{stats.biobanksRepresented}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average Age</h3>
              <p className="text-xl font-semibold text-gray-900">{stats.averageAge} years</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Sort By</h3>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="relevance">Relevance</option>
                <option value="age_asc">Age (Youngest First)</option>
                <option value="age_desc">Age (Oldest First)</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Results Section */}
      <div id="results-section" className="bg-white rounded-lg shadow">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-indigo-600 animate-[spin_1s_linear_infinite] rounded-full absolute top-0 left-0"></div>
            </div>
            <div className="mt-4 text-indigo-600 font-medium">Searching specimens...</div>
          </div>
        ) : filteredResults.length > 0 ? (
          <>
            {/* Results Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'all'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Specimens ({filteredResults.length})
                </button>
                <button 
                  onClick={() => setActiveTab('tissue')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'tissue'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Tissue Samples
                </button>
                <button 
                  onClick={() => setActiveTab('blood')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'blood'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Blood & Fluids
                </button>
                <button 
                  onClick={() => setActiveTab('selected')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'selected'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Selected ({selectedSpecimens.length})
                </button>
              </nav>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getPaginatedResults().map((specimen) => (
                  <div key={specimen.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className={`p-4 ${getTypeColor(specimen.type)} relative`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">{specimen.type}</h3>
                        {specimen.similarity !== undefined && (
                          <span className="text-xs text-gray-600">Match: {(specimen.similarity * 100).toFixed(0)}%</span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <input 
                          type="checkbox" 
                          checked={selectedSpecimens.includes(specimen.id)}
                          onChange={() => toggleSelection(specimen.id)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-4">
                      <div className="flex justify-between text-xs mb-3">
                        <span className="text-gray-600">{specimen.biobank}</span>
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
                        <div>
                          <div className="text-gray-500">Ethnicity</div>
                          <div className="truncate">{specimen.ethnicity}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Quantity</div>
                          <div>{specimen.quantity}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <button className="text-xs font-medium text-gray-700 hover:text-gray-900">
                          View Details
                        </button>
                        <button 
                          onClick={() => toggleSelection(specimen.id)}
                          className={`inline-flex items-center px-3 py-1.5 border ${
                            selectedSpecimens.includes(specimen.id) 
                              ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100' 
                              : 'border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                          } rounded-md text-xs font-medium`}
                        >
                          {selectedSpecimens.includes(specimen.id) ? 'Remove' : 'Add to inquiry'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {(pagination.currentPage - 1) * pagination.pageSize + 1} to {
                    Math.min(pagination.currentPage * pagination.pageSize, pagination.totalResults)
                  } of {pagination.totalResults} results
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      pagination.currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      // Logic for showing pages around current page
                      let pageNum = i + 1;
                      if (pagination.totalPages > 5) {
                        if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 border rounded-md ${
                            pagination.currentPage === pageNum
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      pagination.currentPage === pagination.totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : searchQuery ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No matching specimens</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or filters.</p>
            {activeFilterCount > 0 && (
              <div className="mt-3">
                <button 
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Search specimens</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try searching with natural language like "blood samples from diabetic patients" or "tumor tissue from patients over 60"
            </p>
          </div>
        )}
      </div>

      {/* Selected specimens panel */}
      {selectedSpecimens.length > 0 && (
        <div className="fixed bottom-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Selected Specimens</h3>
              <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">{selectedSpecimens.length}</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedSpecimens([])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowInquiryPanel(true)}
                className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Request Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Inquiry Form Modal */}
      {showInquiryPanel && (
        <div className="fixed inset-0 overflow-y-auto z-20">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Request Selected Specimens
                    </h3>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        You're requesting {selectedSpecimens.length} specimens from {
                          new Set(searchResults
                            .filter(specimen => selectedSpecimens.includes(specimen.id))
                            .map(specimen => specimen.biobank)).size
                        } biobanks
                      </p>
                    </div>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <input
                          type="text"
                          id="project-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter a name for your research project"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="research-purpose" className="block text-sm font-medium text-gray-700">
                          Research Purpose
                        </label>
                        <textarea
                          id="research-purpose"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Describe the purpose of your research"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                          Expected Timeline
                        </label>
                        <select
                          id="timeline"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option>Immediate (1-2 weeks)</option>
                          <option>Soon (2-4 weeks)</option>
                          <option>Future (1-3 months)</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Request
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowInquiryPanel(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}