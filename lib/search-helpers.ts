  // This file contains helper functions for search functionality in a web application.
  
  /**
   * Filter state type definition
   */
export type FilterState = {
    sampleTypes: string[];
    ageRanges: string[];
    genders: string[];
    diagnoses: string[];
    preservationMethods: string[];
    ethnicities: string[];
    biobanks: string[];
    availability: boolean | null;
  };
  

  export const getTypeColor = (type: string): string => {
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
  
  /**
   * Get icon for specimen type
   */
  export const getTypeIcon = (type: string): string => {
    if (type.includes('Tumor') || type.includes('Cancer')) return '🧫';
    if (type.includes('Blood')) return '🩸';
    if (type.includes('Plasma') || type.includes('Serum')) return '💉';
    if (type.includes('CSF')) return '💧';
    if (type.includes('Urine')) return '🧪';
    if (type.includes('Brain')) return '🧠';
    if (type.includes('Heart')) return '❤️';
    if (type.includes('Lung')) return '🫁';
    if (type.includes('Kidney')) return '🫀';
    if (type.includes('Liver')) return '🫑';
    if (type.includes('Skin')) return '👨‍⚕️';
    if (type.includes('Bone')) return '🦴';
    if (type.includes('Hair')) return '💇';
    if (type.includes('Stool')) return '💩';
    if (type.includes('Saliva')) return '💦';
    return '🔬';
  };
  
  /**
   * Parse a filter state from URL search params
   */
  export const parseFiltersFromURL = (searchParams: URLSearchParams): FilterState => {
    const filters: FilterState = {
      sampleTypes: [],
      ageRanges: [],
      genders: [],
      diagnoses: [],
      preservationMethods: [],
      ethnicities: [],
      biobanks: [],
      availability: true
    };
    
    // Parse filter values from URL
    const sampleTypes = searchParams.get('sampleTypes')?.split(',') || [];
    const ageRanges = searchParams.get('ageRanges')?.split(',') || [];
    const genders = searchParams.get('genders')?.split(',') || [];
    const diagnoses = searchParams.get('diagnoses')?.split(',') || [];
    const preservationMethods = searchParams.get('preservationMethods')?.split(',') || [];
    const ethnicities = searchParams.get('ethnicities')?.split(',') || [];
    const biobanks = searchParams.get('biobanks')?.split(',') || [];
    const availability = searchParams.get('availability');
    
    // Update filters object
    filters.sampleTypes = sampleTypes.filter(Boolean);
    filters.ageRanges = ageRanges.filter(Boolean);
    filters.genders = genders.filter(Boolean);
    filters.diagnoses = diagnoses.filter(Boolean);
    filters.preservationMethods = preservationMethods.filter(Boolean);
    filters.ethnicities = ethnicities.filter(Boolean);
    filters.biobanks = biobanks.filter(Boolean);
    
    if (availability === 'true') filters.availability = true;
    else if (availability === 'false') filters.availability = false;
    else if (availability === 'null') filters.availability = null;
    
    return filters;
  };
  
 
  export const updateURLWithFilters = (
    searchParams: URLSearchParams,
    filters: FilterState,
    searchQuery: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Add query if exists
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    // Add filters to URL params
    Object.entries(filters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        params.set(key, values.join(','));
      } else if (Array.isArray(values) && values.length === 0) {
        params.delete(key);
      } else if (values !== null && values !== undefined) {
        params.set(key, String(values));
      } else {
        params.delete(key);
      }
    });
    
    return params;
  };
  
  /**
   * Calculate statistics from search results
   */
  export const calculateSearchStats = (results: any[]) => {
    if (!results.length) {
      return {
        totalSpecimens: 0,
        matchedSpecimens: 0,
        biobanksRepresented: 0,
        averageAge: 0,
        diagnosisBreakdown: {},
        typeBreakdown: {}
      };
    }
    
    const totalSpecimens = results.length;
    const biobanksRepresented = new Set(results.map(item => item.biobank_id)).size;
    const totalAge = results.reduce((sum, item) => sum + item.age_at_collection, 0);
    const averageAge = totalSpecimens ? Math.round(totalAge / totalSpecimens) : 0;
    
    // Calculate diagnosis breakdown
    const diagnosisBreakdown: Record<string, number> = {};
    results.forEach(item => {
      if (item.diagnosis) {
        diagnosisBreakdown[item.diagnosis] = (diagnosisBreakdown[item.diagnosis] || 0) + 1;
      }
    });
    
    // Calculate specimen type breakdown
    const typeBreakdown: Record<string, number> = {};
    results.forEach(item => {
      if (item.type) {
        typeBreakdown[item.type] = (typeBreakdown[item.type] || 0) + 1;
      }
    });
    
    return {
      totalSpecimens,
      matchedSpecimens: totalSpecimens,
      biobanksRepresented,
      averageAge,
      diagnosisBreakdown,
      typeBreakdown
    };
  };
  
  /**
   * Extract unique values for filter options from results
   */
  export const extractFilterOptions = (results: any[]) => {
    const sampleTypes = [...new Set(results.map(item => item.type))];
    const diagnoses = [...new Set(results.map(item => item.diagnosis))];
    const biobanks = [...new Set(results.map(item => item.biobank))];
    const ethnicities = [...new Set(results.map(item => item.ethnicity))];
    const preservationMethods = [...new Set(results.map(item => item.preservation_method))];
    
    return {
      sampleTypes,
      diagnoses,
      biobanks,
      ethnicities,
      preservationMethods
    };
  };
  
  /**
   * Apply client-side filters to search results
   */
  export const applyFilters = (results: any[], filters: FilterState) => {
    if (!results.length) return [];
    
    let filteredResults = [...results];
    
    // Apply sample type filter
    if (filters.sampleTypes.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.sampleTypes.some((type: string) => item.type.includes(type))
      );
    }
    
    // Apply diagnosis filter
    if (filters.diagnoses.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.diagnoses.some((diagnosis: string) => 
          item.diagnosis.toLowerCase().includes(diagnosis.toLowerCase())
        )
      );
    }
    
    // Apply gender filter
    if (filters.genders.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.genders.includes(item.gender)
      );
    }
    
    // Apply preservation method filter
    if (filters.preservationMethods.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.preservationMethods.includes(item.preservation_method)
      );
    }
    
    // Apply ethnicity filter
    if (filters.ethnicities.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.ethnicities.includes(item.ethnicity)
      );
    }
    
    // Apply biobank filter
    if (filters.biobanks.length > 0) {
      filteredResults = filteredResults.filter(item => 
        filters.biobanks.includes(item.biobank)
      );
    }
    
    // Apply age range filter
    if (filters.ageRanges.length > 0) {
      filteredResults = filteredResults.filter(item => {
        return filters.ageRanges.some((range: string) => {
          if (range === '0-18') return item.age_at_collection <= 18;
          if (range === '19-40') return item.age_at_collection >= 19 && item.age_at_collection <= 40;
          if (range === '41-65') return item.age_at_collection >= 41 && item.age_at_collection <= 65;
          if (range === '66+') return item.age_at_collection >= 66;
          return false;
        });
      });
    }
    
    // Apply availability filter
    if (filters.availability !== null) {
      filteredResults = filteredResults.filter(item => item.available === filters.availability);
    }
    
    return filteredResults;
  };
  
  /**
   * Apply sorting to search results
   */
  export const applySorting = (results: any[], sortOption: string, searchQuery: string) => {
    if (!results.length) return [];
    
    const sorted = [...results];
    
    if (sortOption === 'age_asc') {
      sorted.sort((a, b) => a.age_at_collection - b.age_at_collection);
    } else if (sortOption === 'age_desc') {
      sorted.sort((a, b) => b.age_at_collection - a.age_at_collection);
    } else if (sortOption === 'relevance' && searchQuery) {
      sorted.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
    } else if (sortOption === 'alphabetical') {
      sorted.sort((a, b) => a.diagnosis.localeCompare(b.diagnosis));
    }
    
    return sorted;
  };