export interface EventFormData {
    title: string;
    description: string;
    images: string[];
    startTime: Date | null;
    endTime: Date | null;
    location: string;
    capacity: number;
    tags: string[];
  }
  
  export interface ImageData {
    uri: string;
    id?: string; // optional if you upload to storage
  }
  
  export interface Tag {
    label: string;
    value: string;
  }