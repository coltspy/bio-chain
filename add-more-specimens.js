// add-more-specimens.js
// Script to add more diverse specimen data to existing Firebase database

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs 
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Additional biobanks
const additionalBiobanks = [
  { 
    id: "biobank-6", 
    name: "MD Anderson", 
    location: "Houston, TX", 
    institution_type: "Cancer Center" 
  },
  { 
    id: "biobank-7", 
    name: "Cleveland Clinic", 
    location: "Cleveland, OH", 
    institution_type: "Research Hospital" 
  },
  { 
    id: "biobank-8", 
    name: "NIH Biorepository", 
    location: "Bethesda, MD", 
    institution_type: "Government" 
  },
  { 
    id: "biobank-9", 
    name: "UK Biobank", 
    location: "Manchester, UK", 
    institution_type: "International Repository" 
  },
  { 
    id: "biobank-10", 
    name: "Memorial Sloan Kettering", 
    location: "New York, NY", 
    institution_type: "Cancer Center" 
  }
];

// Additional specimens with diverse diagnoses and rare conditions
const additionalSpecimens = [
  {
    id: "spec-11",
    external_id: "MDA-123456",
    biobank_id: "biobank-6",
    type: "Tumor Tissue",
    diagnosis: "Mesothelioma",
    gender: "Male",
    age_at_collection: 59,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "4 slides",
    available: true,
    searchableFields: ["tumor", "tissue", "mesothelioma", "male", "ffpe", "md", "anderson"]
  },
  {
    id: "spec-12",
    external_id: "CC-789012",
    biobank_id: "biobank-7",
    type: "Blood",
    diagnosis: "Multiple Sclerosis",
    gender: "Female",
    age_at_collection: 42,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "5 mL",
    available: true,
    searchableFields: ["blood", "multiple", "sclerosis", "female", "frozen", "cleveland", "clinic"]
  },
  {
    id: "spec-13",
    external_id: "NIH-456789",
    biobank_id: "biobank-8",
    type: "CSF",
    diagnosis: "Parkinson's Disease",
    gender: "Male",
    age_at_collection: 68,
    ethnicity: "Hispanic",
    preservation_method: "Frozen",
    quantity: "2 mL",
    available: true,
    searchableFields: ["csf", "cerebrospinal", "fluid", "parkinson", "disease", "male", "frozen", "nih"]
  },
  {
    id: "spec-14",
    external_id: "UKB-234567",
    biobank_id: "biobank-9",
    type: "Skin Biopsy",
    diagnosis: "Melanoma",
    gender: "Female",
    age_at_collection: 51,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["skin", "biopsy", "melanoma", "female", "ffpe", "uk", "biobank"]
  },
  {
    id: "spec-15",
    external_id: "MSK-345678",
    biobank_id: "biobank-10",
    type: "Bone Marrow",
    diagnosis: "Acute Myeloid Leukemia",
    gender: "Male",
    age_at_collection: 45,
    ethnicity: "Asian",
    preservation_method: "Frozen",
    quantity: "3 mL",
    available: true,
    searchableFields: ["bone", "marrow", "leukemia", "aml", "acute", "myeloid", "male", "frozen", "sloan", "kettering"]
  },
  {
    id: "spec-16",
    external_id: "MDA-567890",
    biobank_id: "biobank-6",
    type: "Urine",
    diagnosis: "Bladder Cancer",
    gender: "Male",
    age_at_collection: 73,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "10 mL",
    available: true,
    searchableFields: ["urine", "bladder", "cancer", "male", "frozen", "md", "anderson"]
  },
  {
    id: "spec-17",
    external_id: "CC-678901",
    biobank_id: "biobank-7",
    type: "Synovial Fluid",
    diagnosis: "Rheumatoid Arthritis",
    gender: "Female",
    age_at_collection: 55,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "4 mL",
    available: true,
    searchableFields: ["synovial", "fluid", "rheumatoid", "arthritis", "female", "frozen", "cleveland", "clinic"]
  },
  {
    id: "spec-18",
    external_id: "NIH-789012",
    biobank_id: "biobank-8",
    type: "Brain Tissue",
    diagnosis: "Alzheimer's Disease",
    gender: "Female",
    age_at_collection: 82,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "6 slides",
    available: true,
    searchableFields: ["brain", "tissue", "alzheimer", "disease", "female", "ffpe", "nih"]
  },
  {
    id: "spec-19",
    external_id: "UKB-891234",
    biobank_id: "biobank-9",
    type: "Liver Biopsy",
    diagnosis: "Non-Alcoholic Steatohepatitis",
    gender: "Male",
    age_at_collection: 47,
    ethnicity: "South Asian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["liver", "biopsy", "nash", "steatohepatitis", "male", "ffpe", "uk", "biobank"]
  },
  {
    id: "spec-20",
    external_id: "MSK-912345",
    biobank_id: "biobank-10",
    type: "Lung Tissue",
    diagnosis: "Small Cell Lung Cancer",
    gender: "Female",
    age_at_collection: 64,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "5 slides",
    available: true,
    searchableFields: ["lung", "tissue", "cancer", "small", "cell", "female", "ffpe", "sloan", "kettering"]
  },
  // Additional specimens for more variety
  {
    id: "spec-21",
    external_id: "MSK-112233",
    biobank_id: "biobank-10",
    type: "Plasma",
    diagnosis: "Metastatic Breast Cancer",
    gender: "Female",
    age_at_collection: 47,
    ethnicity: "Hispanic",
    preservation_method: "Frozen",
    quantity: "8 mL",
    available: true,
    searchableFields: ["plasma", "metastatic", "breast", "cancer", "female", "frozen", "sloan", "kettering"]
  },
  {
    id: "spec-22",
    external_id: "UKB-445566",
    biobank_id: "biobank-9",
    type: "Whole Blood",
    diagnosis: "Lupus",
    gender: "Female",
    age_at_collection: 37,
    ethnicity: "African",
    preservation_method: "Frozen",
    quantity: "12 mL",
    available: true,
    searchableFields: ["whole", "blood", "lupus", "sle", "female", "frozen", "uk", "biobank"]
  },
  {
    id: "spec-23",
    external_id: "NIH-778899",
    biobank_id: "biobank-8",
    type: "Tumor Tissue",
    diagnosis: "Glioblastoma Multiforme",
    gender: "Male",
    age_at_collection: 52,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["tumor", "tissue", "glioblastoma", "multiforme", "gbm", "male", "ffpe", "nih"]
  },
  {
    id: "spec-24",
    external_id: "CC-001122",
    biobank_id: "biobank-7",
    type: "Heart Tissue",
    diagnosis: "Dilated Cardiomyopathy",
    gender: "Male",
    age_at_collection: 61,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["heart", "tissue", "dilated", "cardiomyopathy", "male", "ffpe", "cleveland", "clinic"]
  },
  {
    id: "spec-25",
    external_id: "MDA-334455",
    biobank_id: "biobank-6",
    type: "Blood",
    diagnosis: "Chronic Lymphocytic Leukemia",
    gender: "Male",
    age_at_collection: 76,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "10 mL",
    available: true,
    searchableFields: ["blood", "chronic", "lymphocytic", "leukemia", "cll", "male", "frozen", "md", "anderson"]
  },
  // Rare diseases specimens
  {
    id: "spec-26",
    external_id: "NIH-556677",
    biobank_id: "biobank-8",
    type: "Brain Tissue",
    diagnosis: "Huntington's Disease",
    gender: "Female",
    age_at_collection: 43,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "4 slides",
    available: true,
    searchableFields: ["brain", "tissue", "huntington", "disease", "female", "ffpe", "nih", "rare"]
  },
  {
    id: "spec-27",
    external_id: "UKB-667788",
    biobank_id: "biobank-9",
    type: "Blood",
    diagnosis: "Cystic Fibrosis",
    gender: "Male",
    age_at_collection: 22,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "7 mL",
    available: true,
    searchableFields: ["blood", "cystic", "fibrosis", "male", "frozen", "uk", "biobank", "rare"]
  },
  {
    id: "spec-28",
    external_id: "MSK-889900",
    biobank_id: "biobank-10",
    type: "Tumor Tissue",
    diagnosis: "Ewing Sarcoma",
    gender: "Male",
    age_at_collection: 16,
    ethnicity: "Hispanic",
    preservation_method: "FFPE",
    quantity: "5 slides",
    available: true,
    searchableFields: ["tumor", "tissue", "ewing", "sarcoma", "male", "ffpe", "sloan", "kettering", "rare", "pediatric"]
  },
  {
    id: "spec-29",
    external_id: "CC-990011",
    biobank_id: "biobank-7",
    type: "Muscle Biopsy",
    diagnosis: "Duchenne Muscular Dystrophy",
    gender: "Male",
    age_at_collection: 12,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["muscle", "biopsy", "duchenne", "muscular", "dystrophy", "male", "ffpe", "cleveland", "clinic", "rare", "pediatric"]
  },
  {
    id: "spec-30",
    external_id: "MDA-112233",
    biobank_id: "biobank-6",
    type: "Skin Biopsy",
    diagnosis: "Epidermolysis Bullosa",
    gender: "Female",
    age_at_collection: 8,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["skin", "biopsy", "epidermolysis", "bullosa", "female", "ffpe", "md", "anderson", "rare", "pediatric"]
  },
  // Age variations
  {
    id: "spec-31",
    external_id: "MC-987654",
    biobank_id: "biobank-1",
    type: "Blood",
    diagnosis: "Diabetes Type 2",
    gender: "Male",
    age_at_collection: 87,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "5 mL",
    available: true,
    searchableFields: ["blood", "diabetes", "type 2", "male", "frozen", "elderly", "mayo", "clinic"]
  },
  {
    id: "spec-32",
    external_id: "JH-876543",
    biobank_id: "biobank-2",
    type: "Blood",
    diagnosis: "Leukemia",
    gender: "Female",
    age_at_collection: 7,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "3 mL",
    available: true,
    searchableFields: ["blood", "leukemia", "female", "child", "pediatric", "frozen", "johns", "hopkins"]
  },
  // Additional ethnicity diversity
  {
    id: "spec-33",
    external_id: "SM-765432",
    biobank_id: "biobank-3",
    type: "Plasma",
    diagnosis: "Hypertension",
    gender: "Male",
    age_at_collection: 54,
    ethnicity: "Native American",
    preservation_method: "Frozen",
    quantity: "7 mL",
    available: true,
    searchableFields: ["plasma", "hypertension", "male", "frozen", "native", "american", "stanford"]
  },
  {
    id: "spec-34",
    external_id: "UC-654321",
    biobank_id: "biobank-4",
    type: "Blood",
    diagnosis: "Sickle Cell Anemia",
    gender: "Female",
    age_at_collection: 32,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "8 mL",
    available: true,
    searchableFields: ["blood", "sickle", "cell", "anemia", "female", "frozen", "ucsf"]
  },
  // Other specific conditions
  {
    id: "spec-35",
    external_id: "HR-543210",
    biobank_id: "biobank-5",
    type: "CSF",
    diagnosis: "Multiple Sclerosis",
    gender: "Male",
    age_at_collection: 41,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "2 mL",
    available: true,
    searchableFields: ["csf", "cerebrospinal", "fluid", "multiple", "sclerosis", "ms", "male", "frozen", "harvard"]
  },
  {
    id: "spec-36",
    external_id: "MDA-432109",
    biobank_id: "biobank-6",
    type: "Tumor Tissue",
    diagnosis: "Pancreatic Cancer",
    gender: "Female",
    age_at_collection: 59,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "4 slides",
    available: true,
    searchableFields: ["tumor", "tissue", "pancreatic", "cancer", "female", "ffpe", "md", "anderson"]
  },
  {
    id: "spec-37",
    external_id: "CC-321098",
    biobank_id: "biobank-7",
    type: "Liver Biopsy",
    diagnosis: "Hepatitis C",
    gender: "Male",
    age_at_collection: 48,
    ethnicity: "Hispanic",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["liver", "biopsy", "hepatitis", "male", "ffpe", "cleveland", "clinic"]
  },
  {
    id: "spec-38",
    external_id: "NIH-210987",
    biobank_id: "biobank-8",
    type: "Kidney Tissue",
    diagnosis: "Polycystic Kidney Disease",
    gender: "Female",
    age_at_collection: 39,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["kidney", "tissue", "polycystic", "female", "ffpe", "nih"]
  },
  {
    id: "spec-39",
    external_id: "UKB-109876",
    biobank_id: "biobank-9",
    type: "Blood",
    diagnosis: "HIV",
    gender: "Male",
    age_at_collection: 33,
    ethnicity: "African",
    preservation_method: "Frozen",
    quantity: "9 mL",
    available: true,
    searchableFields: ["blood", "hiv", "male", "frozen", "uk", "biobank"]
  },
  {
    id: "spec-40",
    external_id: "MSK-098765",
    biobank_id: "biobank-10",
    type: "Lymph Node",
    diagnosis: "Hodgkin's Lymphoma",
    gender: "Male",
    age_at_collection: 26,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "4 slides",
    available: true,
    searchableFields: ["lymph", "node", "hodgkin", "lymphoma", "male", "ffpe", "sloan", "kettering"]
  },
  // More variations by sample type
  {
    id: "spec-41",
    external_id: "HR-098123",
    biobank_id: "biobank-5",
    type: "Stool Sample",
    diagnosis: "Crohn's Disease",
    gender: "Female",
    age_at_collection: 29,
    ethnicity: "Caucasian",
    preservation_method: "Frozen",
    quantity: "5 g",
    available: true,
    searchableFields: ["stool", "sample", "crohn", "disease", "female", "frozen", "harvard", "microbiome"]
  },
  {
    id: "spec-42",
    external_id: "SM-123098",
    biobank_id: "biobank-3",
    type: "Saliva",
    diagnosis: "Healthy Control",
    gender: "Male",
    age_at_collection: 44,
    ethnicity: "Asian",
    preservation_method: "Frozen",
    quantity: "2 mL",
    available: true,
    searchableFields: ["saliva", "healthy", "control", "male", "frozen", "stanford", "microbiome"]
  },
  {
    id: "spec-43",
    external_id: "MC-012987",
    biobank_id: "biobank-1",
    type: "Hair Follicles",
    diagnosis: "Alopecia",
    gender: "Female",
    age_at_collection: 35,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "10 follicles",
    available: true,
    searchableFields: ["hair", "follicles", "alopecia", "female", "ffpe", "mayo", "clinic"]
  },
  {
    id: "spec-44",
    external_id: "JH-029876",
    biobank_id: "biobank-2",
    type: "Bone Tissue",
    diagnosis: "Osteoporosis",
    gender: "Female",
    age_at_collection: 73,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["bone", "tissue", "osteoporosis", "female", "elderly", "ffpe", "johns", "hopkins"]
  },
  {
    id: "spec-45",
    external_id: "UC-039876",
    biobank_id: "biobank-4",
    type: "Spinal Cord Tissue",
    diagnosis: "ALS",
    gender: "Male",
    age_at_collection: 57,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["spinal", "cord", "tissue", "als", "amyotrophic", "lateral", "sclerosis", "male", "ffpe", "ucsf"]
  },
  // Extremely rare diseases
  {
    id: "spec-46",
    external_id: "NIH-348765",
    biobank_id: "biobank-8",
    type: "Blood",
    diagnosis: "Progeria",
    gender: "Male",
    age_at_collection: 11,
    ethnicity: "African American",
    preservation_method: "Frozen",
    quantity: "4 mL",
    available: true,
    searchableFields: ["blood", "progeria", "hutchinson", "gilford", "male", "pediatric", "frozen", "nih", "rare"]
  },
  {
    id: "spec-47",
    external_id: "UKB-459876",
    biobank_id: "biobank-9",
    type: "Skin Biopsy",
    diagnosis: "Ehlers-Danlos Syndrome",
    gender: "Female",
    age_at_collection: 24,
    ethnicity: "Caucasian",
    preservation_method: "FFPE",
    quantity: "2 slides",
    available: true,
    searchableFields: ["skin", "biopsy", "ehlers", "danlos", "syndrome", "female", "ffpe", "uk", "biobank", "rare"]
  },
  {
    id: "spec-48",
    external_id: "MSK-549876",
    biobank_id: "biobank-10",
    type: "Blood",
    diagnosis: "Gaucher Disease",
    gender: "Male",
    age_at_collection: 19,
    ethnicity: "Ashkenazi Jewish",
    preservation_method: "Frozen",
    quantity: "6 mL",
    available: true,
    searchableFields: ["blood", "gaucher", "disease", "male", "frozen", "sloan", "kettering", "rare"]
  },
  {
    id: "spec-49",
    external_id: "CC-569876",
    biobank_id: "biobank-7",
    type: "Muscle Biopsy",
    diagnosis: "Pompe Disease",
    gender: "Female",
    age_at_collection: 31,
    ethnicity: "Asian",
    preservation_method: "FFPE",
    quantity: "3 slides",
    available: true,
    searchableFields: ["muscle", "biopsy", "pompe", "disease", "female", "ffpe", "cleveland", "clinic", "rare"]
  },
  {
    id: "spec-50",
    external_id: "MDA-579876",
    biobank_id: "biobank-6",
    type: "Blood",
    diagnosis: "Tay-Sachs Disease",
    gender: "Female",
    age_at_collection: 5,
    ethnicity: "Ashkenazi Jewish",
    preservation_method: "Frozen",
    quantity: "3 mL",
    available: true,
    searchableFields: ["blood", "tay", "sachs", "disease", "female", "pediatric", "frozen", "md", "anderson", "rare"]
  }
];

async function addMoreData() {
  console.log('Checking Firebase configuration...');
  
  // Validate Firebase config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('Missing Firebase configuration. Please check your environment variables.');
    process.exit(1);
  }
  
  console.log(`Connecting to Firebase project: ${firebaseConfig.projectId}`);
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  console.log('Starting data addition...');
  
  try {
    // Add new biobanks
    console.log('Adding new biobanks...');
    for (const biobank of additionalBiobanks) {
      await setDoc(doc(db, 'biobanks', biobank.id), biobank);
      console.log(`- Added biobank: ${biobank.name}`);
    }
    
    // Add new specimens
    console.log('Adding new specimens...');
    for (const specimen of additionalSpecimens) {
      await setDoc(doc(db, 'specimens', specimen.id), specimen);
      console.log(`- Added specimen: ${specimen.external_id} (${specimen.diagnosis})`);
    }
    
    console.log('Additional data successfully added!');
    console.log(`Added ${additionalBiobanks.length} biobanks and ${additionalSpecimens.length} specimens.`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding data to Firebase:', error);
    process.exit(1);
  }
}

// Run the function
addMoreData();