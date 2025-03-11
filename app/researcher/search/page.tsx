'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Type definitions matching your Supabase schema
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
  similarity: number;
};

export default function SpecimenSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  // Core states
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpecimens, setSelectedSpecimens] = useState<string[]>([]);
  
  // Search function that connects to Supabase via API route
  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
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

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  // Get background color based on specimen type
  const getTypeColor = (type: string): string => {
    if (type.includes('Tumor')) return 'bg-red-100';
    if (type.includes('Normal')) return 'bg-green-100';
    if (type.includes('Blood')) return 'bg-blue-100';
    if (type.includes('Plasma')) return 'bg-purple-100';
    if (type.includes('Serum')) return 'bg-indigo-100';
    return 'bg-gray-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Specimen Search</h1>
        <p className="text-sm text-gray-500">
          Search across biospecimens from connected biobanks
        </p>
      </header>

      {/* Search Form */}
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
              placeholder="Search samples (e.g., 'blood samples from diabetic patients')"
            />
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

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="text-sm text-gray-500">Found {searchResults.length} specimens</div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((specimen) => (
                  <div key={specimen.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className={`p-4 ${getTypeColor(specimen.type)} relative`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">{specimen.type}</h3>
                        {specimen.similarity && (
                          <span className="text-xs text-gray-600">Relevance: {(specimen.similarity * 100).toFixed(0)}%</span>
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
                        {specimen.ethnicity && (
                          <div>
                            <div className="text-gray-500">Ethnicity</div>
                            <div>{specimen.ethnicity}</div>
                          </div>
                        )}
                        {specimen.quantity && (
                          <div>
                            <div className="text-gray-500">Quantity</div>
                            <div>{specimen.quantity}</div>
                          </div>
                        )}
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
          </>
        ) : searchQuery ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No matching specimens</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Search specimens</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try searching with natural language like "blood samples from diabetic patients"
            </p>
          </div>
        )}
      </div>

      {/* Selected specimens button */}
      {selectedSpecimens.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700">
            Request {selectedSpecimens.length} Specimens
          </button>
        </div>
      )}
    </div>
  );
}