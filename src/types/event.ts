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

export interface CheckParticipatedResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isParticipated: boolean;
    id?: string;
  };
}

export interface CheckFavouritedResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isFavourited: boolean;
    id?: string;
  };
}

export interface DeleteResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    deleted: boolean;
  };
}

export interface ParticipateEventResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    createdAt: string;
    event: {
      id: string;
      title: string;
      startTime: string;
      endTime: string;
      position: string;
      participantNumber: number;
      imagesMain: string;
      createdBy: string;
    };
    users: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    }[];
  };
}

export interface FavouriteEventResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    createdAt: string;
    event: {
      id: string;
      title: string;
      startTime: string;
      endTime: string;
      position: string;
      participantNumber: number;
      imagesMain: string;
      createdBy: string;
    };
    users: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    }[];
  };
}

export interface EventForm {
  title: string;
  description: string;
  startTime: Date | null;
  endTime: Date | null;
  participantNumber: number;
  position: string;
  hashtags: string[];
  images: string[];
}

export interface CreateEventResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: Event;
} 