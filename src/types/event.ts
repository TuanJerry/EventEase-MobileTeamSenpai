export interface EventImage {
  id: string;
  link: string;
  size: number;
  filename: string;
}

export interface EventHashtag {
  id: string;
  name: string;
  usageCount: number;
}

export interface EventCreator {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  participantNumber: number;
  position: string;
  images: EventImage[];
  hashtags: EventHashtag[];
  createdBy: EventCreator;
}

export interface FavoriteEvent {
  id: string;
  eventId: string;
  title: string;
  startTime: string;
  endTime: string;
  position: string;
  participantNumber: number;
  imagesMain: string;
  createdAt: string;
  createdBy: string;
}

export interface FavoriteEventGroup {
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  events: FavoriteEvent[];
}

export interface FavoriteEventListResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: FavoriteEventGroup[];
}

export interface EventListResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    items: Event[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface TrackedEventsResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    events: {
      createdAt: string;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
      };
      events: FavoriteEvent[];
    }[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface EventDetailResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: Event;
}

export interface EventListProps {
    title: string;
    events: Array<{
        id: string | number;
        title: string;
        backgroundImage: string;
        date: string;
        location: string;
        avatars?: string[];
        totalParticipants?: number;
    }>;
}

export interface EventCardProps {
    id: string | number;
    title: string;
    date: string;
    backgroundImage: string;
    location: string;
    avatars?: string[];
    totalParticipants?: number;
} 