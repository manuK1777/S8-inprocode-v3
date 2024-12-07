export interface Location {
    id?: number;
    name: string;
    category?: string;
    latitude: number;
    longitude: number;
    description?: string;
    contact_id?: number; // Foreign key to the contact table
  }
  