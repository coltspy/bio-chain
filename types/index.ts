export interface Biobank {
    id: string;
    name: string;
    location: string;
    institution_type: string;
  }
  
  export interface Specimen {
    id: string;
    external_id: string;
    biobank_id: string;
    type: string;
    diagnosis: string;
    gender: string;
    age_at_collection: number;
    ethnicity: string;
    collection_date: string;
    preservation_method: string;
    quantity: string;
    available: boolean;
  }
  
  export interface SearchResult extends Specimen {
    similarity: number;
  }