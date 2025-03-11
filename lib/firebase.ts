// lib/firebase.ts - Firebase initialization with collection setup

import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  limit, 
  Firestore
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Sample data for initialization
const biobankData = [
  { id: "biobank-1", name: "Mayo Clinic", location: "Rochester, MN", institution_type: "Research Hospital" },
  { id: "biobank-2", name: "Johns Hopkins", location: "Baltimore, MD", institution_type: "Research Hospital" },
  { id: "biobank-3", name: "Stanford Medical", location: "Palo Alto, CA", institution_type: "Research Hospital" },
  { id: "biobank-4", name: "UCSF Repository", location: "San Francisco, CA", institution_type: "University" },
  { id: "biobank-5", name: "Harvard Biobank", location: "Boston, MA", institution_type: "University" }
];

const specimenData = [
  {
    id: "spec-1",
    external_id: "MC-123456",
    biobank_id: "biobank-1",
    type: "Tumor Tissue",
    diagnosis: "Glioblastoma",
    gender: "Male",
    age_at_collection: 46,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "By Request",
    available: true,
    searchableFields: ["tumor", "tissue", "glioblastoma", "male", "ffpe", "mayo", "clinic"]
  },
  {
    id: "spec-2",
    external_id: "JH-789012",
    biobank_id: "biobank-2",
    type: "Blood",
    diagnosis: "Type 2 Diabetes",
    gender: "Female",
    age_at_collection: 62,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "5 mL",
    available: true,
    searchableFields: ["blood", "diabetes", "type 2", "female", "frozen", "johns", "hopkins"]
  },
  {
    id: "spec-3",
    external_id: "SM-456789",
    biobank_id: "biobank-3",
    type: "Normal Tissue",
    diagnosis: "Healthy Control",
    gender: "Male",
    age_at_collection: 54,
    ethnicity: "Hispanic",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["normal", "tissue", "healthy", "control", "male", "ffpe", "stanford"]
  },
  {
    id: "spec-4",
    external_id: "MC-234567",
    biobank_id: "biobank-1",
    type: "Plasma",
    diagnosis: "Type 1 Diabetes",
    gender: "Female",
    age_at_collection: 28,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "2 mL",
    available: true,
    searchableFields: ["plasma", "diabetes", "type 1", "female", "frozen", "mayo", "clinic"]
  },
  {
    id: "spec-5",
    external_id: "JH-345678",
    biobank_id: "biobank-2",
    type: "Tumor Tissue",
    diagnosis: "Breast Cancer",
    gender: "Female",
    age_at_collection: 58,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "By Request",
    available: true,
    searchableFields: ["tumor", "tissue", "breast", "cancer", "female", "ffpe", "johns", "hopkins"]
  },
  {
    id: "spec-6",
    external_id: "UC-567890",
    biobank_id: "biobank-4",
    type: "Blood",
    diagnosis: "Hypertension",
    gender: "Male",
    age_at_collection: 71,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "10 mL",
    available: true,
    searchableFields: ["blood", "hypertension", "male", "frozen", "ucsf"]
  },
  {
    id: "spec-7",
    external_id: "HR-678901",
    biobank_id: "biobank-5",
    type: "Tumor Tissue",
    diagnosis: "Lung Cancer",
    gender: "Male",
    age_at_collection: 67,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "5 slides",
    available: true,
    searchableFields: ["tumor", "tissue", "lung", "cancer", "male", "ffpe", "harvard"]
  },
  {
    id: "spec-8",
    external_id: "MC-345678",
    biobank_id: "biobank-1",
    type: "Serum",
    diagnosis: "Rheumatoid Arthritis",
    gender: "Female",
    age_at_collection: 49,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "3 mL",
    available: true,
    searchableFields: ["serum", "rheumatoid", "arthritis", "female", "frozen", "mayo", "clinic"]
  },
  {
    id: "spec-9",
    external_id: "SM-567890",
    biobank_id: "biobank-3",
    type: "Normal Tissue",
    diagnosis: "Healthy Control",
    gender: "Female",
    age_at_collection: 42,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["normal", "tissue", "healthy", "control", "female", "ffpe", "stanford"]
  },
  {
    id: "spec-10",
    external_id: "UC-678901",
    biobank_id: "biobank-4",
    type: "Blood",
    diagnosis: "Cardiovascular Disease",
    gender: "Male",
    age_at_collection: 64,
    ethnicity: "Hispanic",
    preservation_method: "Frozen",
    quantity: "7 mL",
    available: true,
    searchableFields: ["blood", "cardiovascular", "disease", "male", "frozen", "ucsf"]
  }
];

// Initialize Firebase
let app;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

db = getFirestore(app);

// Function to initialize collections with sample data
// Only call this when you want to reset/initialize the database
export async function initializeCollections() {
  try {
    console.log('Initializing Firebase collections...');
    
    // Check if biobanks collection is empty
    const biobankRef = collection(db, 'biobanks');
    const biobankSnapshot = await getDocs(query(biobankRef, limit(1)));
    
    if (biobankSnapshot.empty) {
      console.log('Creating biobanks collection...');
      
      // Add biobank data
      const promises = biobankData.map(biobank => 
        setDoc(doc(db, 'biobanks', biobank.id), biobank)
      );
      
      await Promise.all(promises);
      console.log('Biobanks collection created successfully');
    } else {
      console.log('Biobanks collection already exists, skipping initialization');
    }
    
    // Check if specimens collection is empty
    const specimenRef = collection(db, 'specimens');
    const specimenSnapshot = await getDocs(query(specimenRef, limit(1)));
    
    if (specimenSnapshot.empty) {
      console.log('Creating specimens collection...');
      
      // Add specimen data
      const promises = specimenData.map(specimen => 
        setDoc(doc(db, 'specimens', specimen.id), specimen)
      );
      
      await Promise.all(promises);
      console.log('Specimens collection created successfully');
    } else {
      console.log('Specimens collection already exists, skipping initialization');
    }
    
    console.log('Collection initialization complete');
    return { success: true };
  } catch (error) {
    console.error('Error initializing collections:', error);
    return { success: false, error };
  }
}

export { db };