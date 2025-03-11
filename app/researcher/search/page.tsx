// app/researcher/search/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SpecimenSearch() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    sampleTypes: [],
    ageRanges: [],
    genders: [],
    diagnoses: [],
    preservation: []
  });
  
  // Toggle a filter value
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
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
    setSelectedFilters({
      sampleTypes: [],
      ageRanges: [],
      genders: [],
      diagnoses: [],
      preservation: []
    });
  };
  
  // Count total active filters
  const activeFilterCount = Object.values(selectedFilters).flat().length;
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Specimen Search</h1>
          <p className="text-sm text-gray-500">
            Search and filter available biospecimens across connected biobanks
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View by Institution</span>
          </button>
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download List</span>
          </button>
          <div className="relative">
            <Link href="/researcher/inquiries" className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
              <span>0</span>
            </Link>
            <span className="text-xs ml-1">samples in inquiry</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
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
            placeholder="Search specimens by filters (eg: Whole Globe, AMD...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ml-4">
          <button 
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
              activeFilterCount > 0
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => document.getElementById('filterPanel').classList.toggle('hidden')}
          >
            <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div id="filterPanel" className="mb-6 bg-white rounded-lg border border-gray-200 p-4 hidden">
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
              <FilterCheckbox 
                id="tumor-tissue" 
                label="Tumor Tissue" 
                checked={selectedFilters.sampleTypes.includes('Tumor Tissue')}
                onChange={() => toggleFilter('sampleTypes', 'Tumor Tissue')}
              />
              <FilterCheckbox 
                id="normal-tissue" 
                label="Normal Tissue" 
                checked={selectedFilters.sampleTypes.includes('Normal Tissue')}
                onChange={() => toggleFilter('sampleTypes', 'Normal Tissue')}
              />
              <FilterCheckbox 
                id="blood" 
                label="Blood Samples" 
                checked={selectedFilters.sampleTypes.includes('Blood Samples')}
                onChange={() => toggleFilter('sampleTypes', 'Blood Samples')}
              />
              <FilterCheckbox 
                id="plasma" 
                label="Plasma" 
                checked={selectedFilters.sampleTypes.includes('Plasma')}
                onChange={() => toggleFilter('sampleTypes', 'Plasma')}
              />
              <FilterCheckbox 
                id="serum" 
                label="Serum" 
                checked={selectedFilters.sampleTypes.includes('Serum')}
                onChange={() => toggleFilter('sampleTypes', 'Serum')}
              />
            </div>
          </div>
          
          {/* Demographics */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demographics</h4>
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-gray-500">Age Range</h5>
              <div className="grid grid-cols-2 gap-2">
                <FilterCheckbox 
                  id="age-18-45" 
                  label="18-45 years" 
                  checked={selectedFilters.ageRanges.includes('18-45')}
                  onChange={() => toggleFilter('ageRanges', '18-45')}
                />
                <FilterCheckbox 
                  id="age-46-65" 
                  label="46-65 years" 
                  checked={selectedFilters.ageRanges.includes('46-65')}
                  onChange={() => toggleFilter('ageRanges', '46-65')}
                />
                <FilterCheckbox 
                  id="age-66+" 
                  label="66+ years" 
                  checked={selectedFilters.ageRanges.includes('66+')}
                  onChange={() => toggleFilter('ageRanges', '66+')}
                />
              </div>
              
              <h5 className="text-xs font-medium text-gray-500 mt-3">Gender</h5>
              <div className="grid grid-cols-2 gap-2">
                <FilterCheckbox 
                  id="gender-male" 
                  label="Male" 
                  checked={selectedFilters.genders.includes('Male')}
                  onChange={() => toggleFilter('genders', 'Male')}
                />
                <FilterCheckbox 
                  id="gender-female" 
                  label="Female" 
                  checked={selectedFilters.genders.includes('Female')}
                  onChange={() => toggleFilter('genders', 'Female')}
                />
              </div>
            </div>
          </div>
          
          {/* Clinical */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Clinical</h4>
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-gray-500">Diagnosis</h5>
              <div className="space-y-2">
                <FilterCheckbox 
                  id="diagnosis-cancer" 
                  label="Cancer (all types)" 
                  checked={selectedFilters.diagnoses.includes('Cancer')}
                  onChange={() => toggleFilter('diagnoses', 'Cancer')}
                />
                <FilterCheckbox 
                  id="diagnosis-diabetes" 
                  label="Diabetes" 
                  checked={selectedFilters.diagnoses.includes('Diabetes')}
                  onChange={() => toggleFilter('diagnoses', 'Diabetes')}
                />
                <FilterCheckbox 
                  id="diagnosis-cardiovascular" 
                  label="Cardiovascular Disease" 
                  checked={selectedFilters.diagnoses.includes('Cardiovascular')}
                  onChange={() => toggleFilter('diagnoses', 'Cardiovascular')}
                />
              </div>
              
              <h5 className="text-xs font-medium text-gray-500 mt-3">Preservation Method</h5>
              <div className="grid grid-cols-2 gap-2">
                <FilterCheckbox 
                  id="preservation-ffpe" 
                  label="FFPE" 
                  checked={selectedFilters.preservation.includes('FFPE')}
                  onChange={() => toggleFilter('preservation', 'FFPE')}
                />
                <FilterCheckbox 
                  id="preservation-frozen" 
                  label="Frozen" 
                  checked={selectedFilters.preservation.includes('Frozen')}
                  onChange={() => toggleFilter('preservation', 'Frozen')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
            onClick={() => document.getElementById('filterPanel').classList.add('hidden')}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Result Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'all'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Specimens
            <span className="ml-2 py-0.5 px-2.5 text-xs font-medium rounded-full bg-gray-100">
              5,284
            </span>
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'tissue'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('tissue')}
          >
            Tissue
            <span className="ml-2 py-0.5 px-2.5 text-xs font-medium rounded-full bg-gray-100">
              2,193
            </span>
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'blood'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('blood')}
          >
            Blood
            <span className="ml-2 py-0.5 px-2.5 text-xs font-medium rounded-full bg-gray-100">
              1,865
            </span>
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'plasma'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('plasma')}
          >
            Plasma/Serum
            <span className="ml-2 py-0.5 px-2.5 text-xs font-medium rounded-full bg-gray-100">
              1,226
            </span>
          </button>
        </nav>
      </div>

      {/* Results Stats */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <div>Showing 1-8 of 5,284 specimens</div>
        <div className="flex space-x-2 items-center">
          <span>Sort by:</span>
          <select className="border-gray-300 rounded-md text-sm">
            <option>Relevance</option>
            <option>Newest first</option>
            <option>Oldest first</option>
          </select>
        </div>
      </div>

      {/* Specimen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tumor Tissue Card 1 */}
        <SpecimenCard 
          type="Tumor Tissue"
          biobank="Mayo Clinic Biobank"
          id="MC-123456"
          gender="Male"
          race="Caucasian / Slavic"
          diagnosis="Glioblastoma"
          age="46 at Collection"
          preservation="FFPE"
          quantity="By Request"
        />
        
        {/* Tumor Tissue Card 2 */}
        <SpecimenCard 
          type="Tumor Tissue"
          biobank="Johns Hopkins Biorepository"
          id="JH-123456"
          gender="Male"
          race="Caucasian / Slavic"
          diagnosis="Laryngeal cancer"
          age="71 at Collection"
          preservation="Frozen"
          quantity="By Request"
        />
        
        {/* Normal Tissue Card 1 */}
        <SpecimenCard 
          type="Normal Tissue"
          biobank="Stanford Medical Biobank"
          id="SM-123456"
          gender="Male"
          race="Caucasian / Eastern European"
          diagnosis="Non-Hodgkin's lymphoma"
          age="65 at Collection"
          preservation="FFPE"
          quantity="By Request"
        />
        
        {/* Normal Tissue Card 2 */}
        <SpecimenCard 
          type="Normal Tissue"
          biobank="UCSF Tissue Repository"
          id="UC-123456"
          gender="Female"
          race="Caucasian / Eastern European"
          diagnosis="Ovarian cancer"
          age="58 at Collection"
          preservation="Frozen"
          quantity="By Request"
        />

        {/* Plasma Card 1 */}
        <SpecimenCard 
          type="Plasma"
          biobank="Mayo Clinic Biobank"
          id="MC-567890"
          gender="Female"
          race="African American"
          diagnosis="Type 2 Diabetes"
          age="68 at Collection"
          preservation="Frozen"
          quantity="2 ml"
        />
        
        {/* Plasma Card 2 */}
        <SpecimenCard 
          type="Plasma"
          biobank="Johns Hopkins Biorepository"
          id="JH-567890"
          gender="Female"
          race="Hispanic"
          diagnosis="Hypertension"
          age="71 at Collection"
          preservation="Frozen"
          quantity="2 ml"
        />
        
        {/* Serum Card 1 */}
        <SpecimenCard 
          type="Serum"
          biobank="Stanford Medical Biobank"
          id="SM-123498"
          gender="Female"
          race="Asian"
          diagnosis="Rheumatoid Arthritis"
          age="51 at Collection"
          preservation="Frozen"
          quantity="1.8 ml"
        />
        
        {/* Serum Card 2 */}
        <SpecimenCard 
          type="Serum"
          biobank="UCSF Tissue Repository"
          id="UC-123499"
          gender="Male"
          race="Caucasian / Eastern European"
          diagnosis="Crohn's Disease"
          age="44 at Collection"
          preservation="Frozen"
          quantity="2 ml"
        />
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center text-sm text-gray-500">
          Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">8</span> of <span className="font-medium mx-1">5,284</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-indigo-50 text-indigo-600 text-sm rounded-md hover:bg-indigo-100">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            ...
          </button>
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            661
          </button>
          <button className="px-3 py-1 border border-gray-300 text-sm rounded-md bg-white text-gray-500 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Specimen Card Component
function SpecimenCard({ 
  type, 
  biobank, 
  id, 
  gender, 
  race, 
  diagnosis, 
  age, 
  preservation,
  quantity
}) {
  // Determine background color based on type
  let bgColor = type.includes('Tumor') ? 'bg-red-200' : 
                type.includes('Normal') ? 'bg-green-200' : 
                type.includes('Blood') ? 'bg-blue-200' :
                type.includes('Plasma') ? 'bg-purple-200' :
                type.includes('Serum') ? 'bg-indigo-200' : 'bg-gray-200';
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className={`p-4 ${bgColor} relative`}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{type}</h3>
          <div className="flex space-x-2">
            <span>•</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">from {biobank}</span>
          <span className="text-gray-800">ID: {id}</span>
        </div>
        
        <div className="mb-3">
          <button className="flex items-center text-sm font-medium text-gray-800">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Donor Details
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Gender</div>
            <div>{gender}</div>
          </div>
          <div>
            <div className="text-gray-500">Race / Ethnicity</div>
            <div>{race}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Diagnosis</div>
            <div className="truncate">{diagnosis}</div>
          </div>
          <div>
            <div className="text-gray-500">Donor Age</div>
            <div>{age}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Preservation Method</div>
            <div>{preservation}</div>
          </div>
          <div>
            <div className="text-gray-500">Available Quantity</div>
            <div>{quantity}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            All Details
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            <svg className="mr-2 -ml-0.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add to inquiry
          </button>
        </div>
      </div>
    </div>
  );
}

// Filter Checkbox Component
function FilterCheckbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}