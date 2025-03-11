// app/api/search/route.ts (In-Memory solution)
import { NextResponse } from 'next/server';

// In-memory mock database for quick demonstration
const biobanks = [
  { id: "1", name: "Mayo Clinic", location: "Rochester, MN" },
  { id: "2", name: "Johns Hopkins", location: "Baltimore, MD" },
  { id: "3", name: "Stanford Medical", location: "Palo Alto, CA" },
  { id: "4", name: "UCSF Repository", location: "San Francisco, CA" },
  { id: "5", name: "Harvard Biobank", location: "Boston, MA" }
];

const specimens = [
  {
    id: "1",
    external_id: "MC-123456",
    biobank_id: "1",
    type: "Tumor Tissue",
    diagnosis: "Glioblastoma",
    gender: "Male",
    age_at_collection: 46,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "By Request",
    available: true
  },
  {
    id: "2",
    external_id: "JH-789012",
    biobank_id: "2",
    type: "Blood",
    diagnosis: "Type 2 Diabetes",
    gender: "Female",
    age_at_collection: 62,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "5 mL",
    available: true
  },
  {
    id: "3",
    external_id: "SM-456789",
    biobank_id: "3",
    type: "Normal Tissue",
    diagnosis: "Healthy Control",
    gender: "Male",
    age_at_collection: 54,
    ethnicity: "Hispanic",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true
  },
  {
    id: "4",
    external_id: "MC-234567",
    biobank_id: "1",
    type: "Plasma",
    diagnosis: "Type 1 Diabetes",
    gender: "Female",
    age_at_collection: 28,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "2 mL",
    available: true
  },
  {
    id: "5",
    external_id: "JH-345678",
    biobank_id: "2",
    type: "Tumor Tissue",
    diagnosis: "Breast Cancer",
    gender: "Female",
    age_at_collection: 58,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "By Request",
    available: true
  },
  {
    id: "6",
    external_id: "UC-567890",
    biobank_id: "4",
    type: "Blood",
    diagnosis: "Hypertension",
    gender: "Male",
    age_at_collection: 71,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "10 mL",
    available: true
  },
  {
    id: "7",
    external_id: "HR-678901",
    biobank_id: "5",
    type: "Tumor Tissue",
    diagnosis: "Lung Cancer",
    gender: "Male",
    age_at_collection: 67,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "5 slides",
    available: true
  },
  {
    id: "8",
    external_id: "MC-345678",
    biobank_id: "1",
    type: "Serum",
    diagnosis: "Rheumatoid Arthritis",
    gender: "Female",
    age_at_collection: 49,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "3 mL",
    available: true
  },
  {
    id: "9",
    external_id: "SM-567890",
    biobank_id: "3",
    type: "Normal Tissue",
    diagnosis: "Healthy Control",
    gender: "Female",
    age_at_collection: 42,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true
  },
  {
    id: "10",
    external_id: "UC-678901",
    biobank_id: "4",
    type: "Blood",
    diagnosis: "Cardiovascular Disease",
    gender: "Male",
    age_at_collection: 64,
    ethnicity: "Hispanic",
    preservation_method: "Frozen",
    quantity: "7 mL",
    available: true
  },
  {
    id: "11",
    external_id: "HR-789012",
    biobank_id: "5",
    type: "Tumor Tissue",
    diagnosis: "Colorectal Cancer",
    gender: "Female",
    age_at_collection: 52,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "By Request",
    available: true
  },
  {
    id: "12",
    external_id: "JH-456789",
    biobank_id: "2",
    type: "Plasma",
    diagnosis: "Alzheimer's Disease",
    gender: "Male",
    age_at_collection: 78,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "4 mL",
    available: true
  },
  {
    id: "13",
    external_id: "MC-567890",
    biobank_id: "1",
    type: "Blood",
    diagnosis: "Leukemia",
    gender: "Male",
    age_at_collection: 36,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "15 mL",
    available: true
  },
  {
    id: "14",
    external_id: "SM-678901",
    biobank_id: "3",
    type: "Tumor Tissue",
    diagnosis: "Pancreatic Cancer",
    gender: "Female",
    age_at_collection: 61,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "4 slides",
    available: true
  },
  {
    id: "15",
    external_id: "UC-789012",
    biobank_id: "4",
    type: "Normal Tissue",
    diagnosis: "Healthy Control",
    gender: "Male",
    age_at_collection: 45,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true
  }
];

// Create a biobank map for faster lookup
const biobankMap: Record<string, string> = {};
biobanks.forEach(bank => {
  biobankMap[bank.id] = bank.name;
});

export async function POST(request: Request) {
  try {
    // Parse request
    const body = await request.json();
    const searchQuery = body?.query || '';
    
    console.log('Search query:', searchQuery);
    
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter specimens based on search query
    let results = [...specimens];
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      
      results = specimens.filter(specimen => 
        specimen.type.toLowerCase().includes(lowerQuery) ||
        specimen.diagnosis.toLowerCase().includes(lowerQuery) ||
        specimen.gender.toLowerCase().includes(lowerQuery) ||
        biobankMap[specimen.biobank_id].toLowerCase().includes(lowerQuery) ||
        specimen.preservation_method.toLowerCase().includes(lowerQuery) ||
        specimen.ethnicity.toLowerCase().includes(lowerQuery)
      );
      
      // Add similarity scores
      results = results.map(specimen => {
        // Calculate how closely it matches the query
        const typeMatch = specimen.type.toLowerCase().includes(lowerQuery) ? 0.3 : 0;
        const diagnosisMatch = specimen.diagnosis.toLowerCase().includes(lowerQuery) ? 0.2 : 0;
        const biobankMatch = biobankMap[specimen.biobank_id].toLowerCase().includes(lowerQuery) ? 0.2 : 0;
        const baseScore = 0.5;
        
        return {
          ...specimen,
          biobank: biobankMap[specimen.biobank_id],
          similarity: Math.min(baseScore + typeMatch + diagnosisMatch + biobankMatch, 1)
        };
      });
      
      // Sort by similarity
    } else {
      // Add biobank names
      results = results.map(specimen => ({
        ...specimen,
        biobank: biobankMap[specimen.biobank_id],
        similarity: 0.7 // Default similarity
      }));
    }
    
    return NextResponse.json({
      results,
      meta: {
        query: searchQuery,
        count: results.length
      }
    });
    
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