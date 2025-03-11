'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// Types
interface SpecimenData {
  id: string;
  type: string;
  biobank: string;
  gender: string;
  race: string;
  diagnosis: string;
  age: string;
  preservation: string;
  quantity: string;
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

const SpecimenSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecimens, setSelectedSpecimens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    sampleTypes: [] as string[],
    ageRanges: [] as string[],
    genders: [] as string[],
    diagnoses: [] as string[],
    preservation: [] as string[]
  });

  // Sample data
  const specimens: SpecimenData[] = [
    {
      id: "MC-123456",
      type: "Tumor Tissue",
      biobank: "Mayo Clinic Biobank",
      gender: "Male",
      race: "Caucasian / Slavic",
      diagnosis: "Glioblastoma",
      age: "46 at Collection",
      preservation: "FFPE",
      quantity: "By Request"
    },
    {
      id: "JH-123456",
      type: "Tumor Tissue",
      biobank: "Johns Hopkins",
      gender: "Male",
      race: "Caucasian / Slavic",
      diagnosis: "Laryngeal cancer",
      age: "71 at Collection",
      preservation: "Frozen",
      quantity: "By Request"
    },
    {
      id: "SM-123456",
      type: "Normal Tissue",
      biobank: "Stanford Medical",
      gender: "Male",
      race: "Caucasian / European",
      diagnosis: "Non-Hodgkin's lymphoma",
      age: "65 at Collection",
      preservation: "FFPE",
      quantity: "By Request"
    },
    {
      id: "UC-123456",
      type: "Normal Tissue",
      biobank: "UCSF Repository",
      gender: "Female",
      race: "Caucasian / European",
      diagnosis: "Ovarian cancer",
      age: "58 at Collection",
      preservation: "Frozen",
      quantity: "By Request"
    },
    {
      id: "MC-567890",
      type: "Plasma",
      biobank: "Mayo Clinic Biobank",
      gender: "Female",
      race: "African American",
      diagnosis: "Type 2 Diabetes",
      age: "68 at Collection",
      preservation: "Frozen",
      quantity: "2 ml"
    },
    {
      id: "JH-567890",
      type: "Plasma",
      biobank: "Johns Hopkins",
      gender: "Female",
      race: "Hispanic",
      diagnosis: "Hypertension",
      age: "71 at Collection",
      preservation: "Frozen",
      quantity: "2 ml"
    },
    {
      id: "SM-123498",
      type: "Serum",
      biobank: "Stanford Medical",
      gender: "Female",
      race: "Asian",
      diagnosis: "Rheumatoid Arthritis",
      age: "51 at Collection",
      preservation: "Frozen",
      quantity: "1.8 ml"
    },
    {
      id: "UC-123499",
      type: "Serum",
      biobank: "UCSF Repository",
      gender: "Male",
      race: "Caucasian / European",
      diagnosis: "Crohn's Disease",
      age: "44 at Collection",
      preservation: "Frozen",
      quantity: "2 ml"
    }
  ];

  // Filter options
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
      { id: 'diagnosis-cardiovascular', label: 'Cardiovascular Disease', value: 'cardiovascular' }
    ],
    preservation: [
      { id: 'preservation-ffpe', label: 'FFPE', value: 'FFPE' },
      { id: 'preservation-frozen', label: 'Frozen', value: 'Frozen' }
    ]
  };

  // Load specimens with delay for UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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

  // Filter specimens based on current filters and search
  const filteredSpecimens = specimens.filter(specimen => {
    // Filter by tab
    if (activeTab === 'tissue' && !specimen.type.includes('Tissue')) return false;
    if (activeTab === 'blood' && !specimen.type.includes('Blood')) return false;
    if (activeTab === 'plasma' && !(specimen.type.includes('Plasma') || specimen.type.includes('Serum'))) return false;
    
    // Filter by search query
    if (searchQuery && !Object.values(specimen).some(val => 
      val.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false;
    
    // Filter by selected filters
    if (filters.sampleTypes.length && !filters.sampleTypes.some(type => specimen.type.includes(type))) return false;
    if (filters.genders.length && !filters.genders.includes(specimen.gender)) return false;
    if (filters.preservation.length && !filters.preservation.includes(specimen.preservation)) return false;
    
    // Filter by diagnosis category
    if (filters.diagnoses.length) {
      const diagLower = specimen.diagnosis.toLowerCase();
      if (!filters.diagnoses.some(diag => diagLower.includes(diag))) return false;
    }
    
    // Filter by age range (simplified for demo)
    if (filters.ageRanges.length) {
      const age = parseInt(specimen.age.split(' ')[0]);
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
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    
    // Update URL with query
    router.push(`/researcher/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Specimen Search</h1>
          <p className="text-sm text-gray-500">
            Search across biospecimens from connected biobanks
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900">
            <span className="flex items-center">
              <svg className="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </span>
          </button>
          <Link 
            href={selectedSpecimens.length > 0 ? "/researcher/inquiries" : "#"}
            className={`flex items-center ${selectedSpecimens.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <span className="relative">
              <span className="absolute -right-1 -top-1 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {selectedSpecimens.length}
              </span>
              <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-1">View Inquiry</span>
            </span>
          </Link>
        </div>
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
              placeholder="Search by condition, tissue type, etc. (e.g., 'lung cancer tissue from female patients')"
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
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
            <div>
              {isLoading ? (
                "Loading results..."
              ) : (
                `Showing ${filteredSpecimens.length} of ${filteredSpecimens.length === specimens.length ? '5,284' : filteredSpecimens.length} specimens`
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <span>Sort by:</span>
              <select className="border-gray-300 rounded-md text-sm">
                <option>Relevance</option>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </div>
          </div>

          {/* Specimen Cards */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredSpecimens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSpecimens.map(specimen => (
                <SpecimenCard 
                  key={specimen.id} 
                  specimen={specimen}
                  isSelected={selectedSpecimens.includes(specimen.id)}
                  onToggleSelect={() => toggleSelection(specimen.id)}
                />
              ))}
            </div>
          ) : (
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
          )}
        </div>
        
        {filteredSpecimens.length > 0 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              1-{filteredSpecimens.length} of {filteredSpecimens.length === specimens.length ? '5,284' : filteredSpecimens.length} results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-400 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-indigo-500 bg-indigo-50 text-indigo-600 rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Action Bar when specimens are selected */}
      {selectedSpecimens.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg animate-slideUp">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">{selectedSpecimens.length}</span> specimens selected
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setSelectedSpecimens([])}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear selection
              </button>
              <Link
                href="/researcher/inquiries"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Inquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SpecimenCard Component
interface SpecimenCardProps {
  specimen: SpecimenData;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const SpecimenCard = ({ specimen, isSelected, onToggleSelect }: SpecimenCardProps) => {
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
          <span className="text-gray-600">{specimen.biobank}</span>
          <span className="text-gray-800">ID: {specimen.id}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <div className="text-gray-500">Gender</div>
            <div>{specimen.gender}</div>
          </div>
          <div>
            <div className="text-gray-500">Age</div>
            <div>{specimen.age}</div>
          </div>
          <div>
            <div className="text-gray-500">Diagnosis</div>
            <div className="truncate">{specimen.diagnosis}</div>
          </div>
          <div>
            <div className="text-gray-500">Preservation</div>
            <div>{specimen.preservation}</div>
          </div>
        </div>
        
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
};

export default SpecimenSearch;