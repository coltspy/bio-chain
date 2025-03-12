// app/api/search/route.ts - Enhanced semantic search implementation
import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  getDocs, 
  limit 
} from 'firebase/firestore';

// Firebase configuration - using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Parse a semantic search query to extract various conditions
 */
function parseSemanticQuery(queryText: string) {
  queryText = queryText.toLowerCase();
  
  // Extract age conditions
  const ageConditions = {
    ageMin: null as number | null,
    ageMax: null as number | null
  };
  
  // Match patterns like "age 65 and up", "older than 50", "ages 30-45", "under 30"
  const ageAbovePatterns = [
    /age (\d+) (and|&) (up|above|older)/i,
    /over (\d+)/i,
    /older than (\d+)/i,
    /above (\d+)/i,
    /(\d+) years or older/i,
    /(\d+)\+/i
  ];
  
  const ageBelowPatterns = [
    /under (\d+)/i,
    /below (\d+)/i,
    /younger than (\d+)/i,
    /less than (\d+) years/i
  ];
  
  const ageRangePatterns = [
    /ages? (\d+)[ -]to[ -](\d+)/i,
    /ages? (\d+)[ -](\d+)/i,
    /between (\d+) and (\d+)/i
  ];
  
  // Check for age above patterns
  for (const pattern of ageAbovePatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMin = parseInt(match[1]);
      break;
    }
  }
  
  // Check for age below patterns
  for (const pattern of ageBelowPatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMax = parseInt(match[1]);
      break;
    }
  }
  
  // Check for age range patterns
  for (const pattern of ageRangePatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMin = parseInt(match[1]);
      ageConditions.ageMax = parseInt(match[2]);
      break;
    }
  }
  
  // Extract gender conditions
  let gender = null;
  if (/(^| )male($| )/i.test(queryText) && !/(^| )female($| )/i.test(queryText)) {
    gender = 'Male';
  } else if (/(^| )female($| )/i.test(queryText) && !/(^| )male($| )/i.test(queryText)) {
    gender = 'Female';
  }
  
  // Extract sample types
  const sampleTypePatterns = [
    { pattern: /(blood|serum|plasma)/i, type: 'Blood' },
    { pattern: /plasma/i, type: 'Plasma' },
    { pattern: /serum/i, type: 'Serum' },
    { pattern: /tumor/i, type: 'Tumor Tissue' },
    { pattern: /tissue/i, type: 'Tissue' },
    { pattern: /csf|cerebrospinal/i, type: 'CSF' },
    { pattern: /urine/i, type: 'Urine' },
    { pattern: /bone marrow/i, type: 'Bone Marrow' },
    { pattern: /synovial/i, type: 'Synovial Fluid' },
    { pattern: /biopsy/i, type: 'Biopsy' }
  ];
  
  const detectedSampleTypes: string[] = [];
  for (const { pattern, type } of sampleTypePatterns) {
    if (pattern.test(queryText)) {
      detectedSampleTypes.push(type);
    }
  }
  
  // Extract diagnoses/diseases
  const diseasePatterns = [
    { pattern: /cancer|tumor|malignant/i, diagnosis: 'Cancer' },
    { pattern: /diabet/i, diagnosis: 'Diabetes' },
    { pattern: /alzheimer/i, diagnosis: 'Alzheimer' },
    { pattern: /parkinson/i, diagnosis: 'Parkinson' },
    { pattern: /huntington/i, diagnosis: 'Huntington' },
    { pattern: /leukemia/i, diagnosis: 'Leukemia' },
    { pattern: /melanoma/i, diagnosis: 'Melanoma' },
    { pattern: /arthritis/i, diagnosis: 'Arthritis' }
  ];
  
  const detectedDiagnoses: string[] = [];
  for (const { pattern, diagnosis } of diseasePatterns) {
    if (pattern.test(queryText)) {
      detectedDiagnoses.push(diagnosis);
    }
  }
  
  // Extract preservation methods
  const preservationPatterns = [
    { pattern: /ffpe|formalin/i, method: 'FFPE' },
    { pattern: /frozen/i, method: 'Frozen' }
  ];
  
  const detectedPreservationMethods: string[] = [];
  for (const { pattern, method } of preservationPatterns) {
    if (pattern.test(queryText)) {
      detectedPreservationMethods.push(method);
    }
  }
  
  // Return the extracted semantic conditions
  return {
    ageConditions,
    gender,
    sampleTypes: detectedSampleTypes,
    diagnoses: detectedDiagnoses,
    preservationMethods: detectedPreservationMethods,
    originalQuery: queryText
  };
}

export async function POST(request: Request) {
  try {
    // Parse request
    const body = await request.json();
    const searchQuery = body?.query || '';
    
    console.log('Search query:', searchQuery);
    
    // Parse semantic conditions from the query
    const semanticConditions = parseSemanticQuery(searchQuery);
    console.log('Parsed semantic conditions:', semanticConditions);
    
    try {
      // Get biobanks for later joining
      const biobanksRef = collection(db, 'biobanks');
      const biobanksSnapshot = await getDocs(biobanksRef);
      
      // Create biobank lookup map
      const biobankMap: Record<string, string> = {};
      biobanksSnapshot.forEach(doc => {
        const data = doc.data();
        biobankMap[doc.id] = data.name;
      });
      
      // Create a reference to the specimens collection and get all specimens
      // (We'll filter client-side for now due to Firestore limitations)
      const specimensRef = collection(db, 'specimens');
      const specimensQuery = query(specimensRef, limit(100));
      const querySnapshot = await getDocs(specimensQuery);
      
      // Process results with client-side filtering
      let results: any[] = [];
      querySnapshot.forEach((doc) => {
        const specimenData = doc.data();
        
        // Apply semantic filters
        
        // Filter by age
        if (semanticConditions.ageConditions.ageMin !== null && 
            specimenData.age_at_collection < semanticConditions.ageConditions.ageMin) {
          return; // Skip - age is below minimum
        }
        
        if (semanticConditions.ageConditions.ageMax !== null && 
            specimenData.age_at_collection > semanticConditions.ageConditions.ageMax) {
          return; // Skip - age is above maximum
        }
        
        // Filter by gender
        if (semanticConditions.gender && 
            specimenData.gender !== semanticConditions.gender) {
          return; // Skip - gender doesn't match
        }
        
        // Filter by sample type
        if (semanticConditions.sampleTypes.length > 0) {
          const matchesSampleType = semanticConditions.sampleTypes.some(type => 
            specimenData.type.includes(type) || 
            (type === 'Blood' && (specimenData.type.includes('Blood') || 
                                 specimenData.type.includes('Plasma') || 
                                 specimenData.type.includes('Serum')))
          );
          
          if (!matchesSampleType) {
            return; // Skip - sample type doesn't match
          }
        }
        
        // Filter by diagnosis
        if (semanticConditions.diagnoses.length > 0) {
          const matchesDiagnosis = semanticConditions.diagnoses.some(diagnosis => 
            specimenData.diagnosis.toLowerCase().includes(diagnosis.toLowerCase())
          );
          
          if (!matchesDiagnosis) {
            return; // Skip - diagnosis doesn't match
          }
        }
        
        // Filter by preservation method
        if (semanticConditions.preservationMethods.length > 0) {
          const matchesPreservation = semanticConditions.preservationMethods.some(method => 
            specimenData.preservation_method.includes(method)
          );
          
          if (!matchesPreservation) {
            return; // Skip - preservation method doesn't match
          }
        }
        
        // If we made it here, basic semantic filtering passed
        // Now, check for general text matches to improve relevance
        
        // If there's still text in the query beyond what was parsed for semantics
        // we can do a general text match as well
        let textMatchScore = 0;
        
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          
          // Check various fields for match to boost score
          if (specimenData.type?.toLowerCase().includes(lowerQuery)) textMatchScore += 0.2;
          if (specimenData.diagnosis?.toLowerCase().includes(lowerQuery)) textMatchScore += 0.2;
          if (specimenData.gender?.toLowerCase() === lowerQuery) textMatchScore += 0.1;
          
          // Check if biobank name matches
          const biobankName = biobankMap[specimenData.biobank_id] || '';
          if (biobankName.toLowerCase().includes(lowerQuery)) textMatchScore += 0.1;
          
          // Check searchableFields array for exact matches
          if (Array.isArray(specimenData.searchableFields)) {
            const exactMatch = specimenData.searchableFields.some((field: string) => 
              field === lowerQuery
            );
            if (exactMatch) textMatchScore += 0.3;
          }
        }
        
        // Calculate final similarity score
        // Higher weight to semantic matches
        let semanticMatchCount = 0;
        if (semanticConditions.ageConditions.ageMin !== null || 
            semanticConditions.ageConditions.ageMax !== null) semanticMatchCount++;
        if (semanticConditions.gender) semanticMatchCount++;
        if (semanticConditions.sampleTypes.length > 0) semanticMatchCount++;
        if (semanticConditions.diagnoses.length > 0) semanticMatchCount++;
        if (semanticConditions.preservationMethods.length > 0) semanticMatchCount++;
        
        // Base score depends on how many semantic conditions matched
        let similarity = 0.5 + (semanticMatchCount * 0.1) + textMatchScore;
        similarity = Math.min(similarity, 1); // Cap at 1.0
        
        // Add the document to results with biobank name
        results.push({
          id: doc.id,
          ...specimenData,
          biobank: biobankMap[specimenData.biobank_id] || 'Unknown Biobank',
          similarity
        });
      });
      
      // Sort by similarity score
      results.sort((a, b) => b.similarity - a.similarity);
      
      // Limit to 50 results after filtering
      results = results.slice(0, 50);
      
      return NextResponse.json({
        results,
        meta: {
          query: searchQuery,
          count: results.length,
          semanticConditions
        }
      });
      
    } catch (firestoreError) {
      console.error('Firebase error:', firestoreError);
      
      return NextResponse.json({
        results: [],
        meta: {
          error: "Database error - please try again",
          count: 0
        }
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json({
      results: [],
      meta: {
        error: "An unexpected error occurred while processing your search",
        count: 0
      }
    }, { status: 500 });
  }
}