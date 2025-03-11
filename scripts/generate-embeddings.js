// scripts/generate-embeddings.js
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for admin access
);

async function generateEmbeddings() {
  // Get all specimens without embeddings
  const { data: specimens, error } = await supabase
    .from('specimens')
    .select('*')
    .is('embedding', null);
  
  if (error) {
    console.error('Error fetching specimens:', error);
    return;
  }
  
  console.log(`Generating embeddings for ${specimens.length} specimens...`);
  
  for (const specimen of specimens) {
    // Create text representation of the specimen
    const content = `
      Specimen type: ${specimen.type}
      Diagnosis: ${specimen.diagnosis || 'N/A'}
      Gender: ${specimen.gender || 'N/A'}
      Age: ${specimen.age_at_collection || 'N/A'}
      Ethnicity: ${specimen.ethnicity || 'N/A'}
      Preservation method: ${specimen.preservation_method || 'N/A'}
    `;
    
    try {
      // Generate embedding
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: content.trim(),
      });
      
      const embedding = response.data[0].embedding;
      
      // Update the specimen with the embedding
      const { error: updateError } = await supabase
        .from('specimens')
        .update({ embedding })
        .eq('id', specimen.id);
      
      if (updateError) {
        console.error(`Error updating specimen ${specimen.id}:`, updateError);
      } else {
        console.log(`Updated embedding for specimen ${specimen.id}`);
      }
    } catch (error) {
      console.error(`Error generating embedding for specimen ${specimen.id}:`, error);
    }
    
    // Avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('Embedding generation complete!');
}

generateEmbeddings().catch(console.error);