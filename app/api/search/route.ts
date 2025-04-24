import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  getDocs, 
  limit 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDD2hqPNFJ7duzBLw-Ea0d-JLgGwOqo08s",
  authDomain: "bio-chain.firebaseapp.com",
  projectId: "bio-chain",
  storageBucket: "bio-chain.firebasestorage.app",
  messagingSenderId: "260700679379",
  appId: "1:260700679379:web:f60dcf4026059e66ef3826",
  measurementId: "G-WK82TZT5QS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function parseSemanticQuery(queryText: string) {
  queryText = queryText.toLowerCase();
  
  const ageConditions = {
    ageMin: null as number | null,
    ageMax: null as number | null
  };
  
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
  
  for (const pattern of ageAbovePatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMin = parseInt(match[1]);
      break;
    }
  }
  
  for (const pattern of ageBelowPatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMax = parseInt(match[1]);
      break;
    }
  }
  
  for (const pattern of ageRangePatterns) {
    const match = queryText.match(pattern);
    if (match) {
      ageConditions.ageMin = parseInt(match[1]);
      ageConditions.ageMax = parseInt(match[2]);
      break;
    }
  }
  
  let gender = null;
  if (/(^| )male($| )/i.test(queryText) && !/(^| )female($| )/i.test(queryText)) {
    gender = 'Male';
  } else if (/(^| )female($| )/i.test(queryText) && !/(^| )male($| )/i.test(queryText)) {
    gender = 'Female';
  }
  
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
    const body = await request.json();
    const searchQuery = body?.query || '';
    
    console.log('Search query:', searchQuery);
    
    const semanticConditions = parseSemanticQuery(searchQuery);
    console.log('Parsed semantic conditions:', semanticConditions);
    
    try {
      const biobanksRef = collection(db, 'biobanks');
      const biobanksSnapshot = await getDocs(biobanksRef);
      
      const biobankMap: Record<string, string> = {};
      biobanksSnapshot.forEach(doc => {
        const data = doc.data();
        biobankMap[doc.id] = data.name;
      });
      
      const specimensRef = collection(db, 'specimens');
      const specimensQuery = query(specimensRef, limit(100));
      const querySnapshot = await getDocs(specimensQuery);
      
      let results: any[] = [];
      querySnapshot.forEach((doc) => {
        const specimenData = doc.data();
        
        if (semanticConditions.ageConditions.ageMin !== null && 
            specimenData.age_at_collection < semanticConditions.ageConditions.ageMin) {
          return;
        }
        
        if (semanticConditions.ageConditions.ageMax !== null && 
            specimenData.age_at_collection > semanticConditions.ageConditions.ageMax) {
          return;
        }
        
        if (semanticConditions.gender && 
            specimenData.gender !== semanticConditions.gender) {
          return;
        }
        
        if (semanticConditions.sampleTypes.length > 0) {
          const matchesSampleType = semanticConditions.sampleTypes.some(type => 
            specimenData.type.includes(type) || 
            (type === 'Blood' && (specimenData.type.includes('Blood') || 
                                 specimenData.type.includes('Plasma') || 
                                 specimenData.type.includes('Serum')))
          );
          
          if (!matchesSampleType) {
            return;
          }
        }
        
        if (semanticConditions.diagnoses.length > 0) {
          const matchesDiagnosis = semanticConditions.diagnoses.some(diagnosis => 
            specimenData.diagnosis.toLowerCase().includes(diagnosis.toLowerCase())
          );
          
          if (!matchesDiagnosis) {
            return;
          }
        }
        
        if (semanticConditions.preservationMethods.length > 0) {
          const matchesPreservation = semanticConditions.preservationMethods.some(method => 
            specimenData.preservation_method.includes(method)
          );
          
          if (!matchesPreservation) {
            return;
          }
        }
        
        let textMatchScore = 0;
        
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          
          if (specimenData.type?.toLowerCase().includes(lowerQuery)) textMatchScore += 0.2;
          if (specimenData.diagnosis?.toLowerCase().includes(lowerQuery)) textMatchScore += 0.2;
          if (specimenData.gender?.toLowerCase() === lowerQuery) textMatchScore += 0.1;
          
          const biobankName = biobankMap[specimenData.biobank_id] || '';
          if (biobankName.toLowerCase().includes(lowerQuery)) textMatchScore += 0.1;
          
          if (Array.isArray(specimenData.searchableFields)) {
            const exactMatch = specimenData.searchableFields.some((field: string) => 
              field === lowerQuery
            );
            if (exactMatch) textMatchScore += 0.3;
          }
        }
        
        let semanticMatchCount = 0;
        if (semanticConditions.ageConditions.ageMin !== null || 
            semanticConditions.ageConditions.ageMax !== null) semanticMatchCount++;
        if (semanticConditions.gender) semanticMatchCount++;
        if (semanticConditions.sampleTypes.length > 0) semanticMatchCount++;
        if (semanticConditions.diagnoses.length > 0) semanticMatchCount++;
        if (semanticConditions.preservationMethods.length > 0) semanticMatchCount++;
        
        let similarity = 0.5 + (semanticMatchCount * 0.1) + textMatchScore;
        similarity = Math.min(similarity, 1);
        
        results.push({
          id: doc.id,
          ...specimenData,
          biobank: biobankMap[specimenData.biobank_id] || 'Unknown Biobank',
          similarity
        });
      });
      
      results.sort((a, b) => b.similarity - a.similarity);
      
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