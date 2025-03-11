// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Mock data for fallback
const mockSpecimens = [
  {
    id: "mock-1",
    external_id: "MC-123456",
    biobank: "Mayo Clinic",
    type: "Tumor Tissue",
    diagnosis: "Glioblastoma",
    gender: "Male",
    age_at_collection: 46,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "By Request",
    similarity: 0.95
  }
];

export async function POST(request: Request) {
  try {
    // Initialize Supabase client inside the handler
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse request
    const body = await request.json();
    const query = body?.query || '';
    
    console.log('Search query:', query);
    
    try {
      // Simple fetch of all specimens
      const { data: specimens, error } = await supabase
        .from('specimens')
        .select('*')
        .limit(20);
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Add biobank names
      const { data: biobanks } = await supabase
        .from('biobanks')
        .select('id, name');
      
      // Create biobank map with proper typing
      const biobankMap: Record<string, string> = {};
      if (biobanks) {
        biobanks.forEach(bank => {
          biobankMap[bank.id] = bank.name;
        });
      }
      
      // Format results
      const results = specimens.map(specimen => ({
        ...specimen,
        biobank: biobankMap[specimen.biobank_id] || 'Unknown',
        similarity: 0.9 // Default similarity score
      }));
      
      return NextResponse.json({
        results,
        meta: {
          query,
          count: results.length
        }
      });
      
    } catch (supabaseError) {
      console.error('Error querying database:', supabaseError);
      
      // Return mock data on error
      return NextResponse.json({
        results: mockSpecimens,
        meta: {
          query,
          error: "Database error - using mock data",
          mode: "mock"
        }
      });
    }
    
  } catch (error) {
    console.error('API error:', error);
    
    // Return mock data on any error
    return NextResponse.json({
      results: mockSpecimens,
      meta: {
        error: "API error - using mock data",
        mode: "mock"
      }
    });
  }
}