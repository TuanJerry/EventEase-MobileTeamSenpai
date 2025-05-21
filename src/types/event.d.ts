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

export interface EventCardProps {
  id: number;
  title: string;
  date: string;
  backgroundImage: string;
  totalParticipants: number;
  avatars: string[];
  location: string;
}

export interface EventListProps {
  title: string;
  events: EventCardProps[];
}

