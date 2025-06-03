import axiosInstance from './axios';
import { EventListResponse, FavoriteEventListResponse, EventDetailResponse } from '../types/event';
import { Event } from '../types/event';
import { TrackedEventsResponse } from '../types/event';
import { FavoriteEvent } from '../types/event';
import { NearbyEventListResponse } from '../types/nearbyEvent';

interface ParticipateResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: null | { deleted: boolean };
}

interface CheckParticipateResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isParticipated: boolean;
  };
}

interface FavoriteResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: null | {
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
    users: Array<{
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    }>;
  };
}

interface CheckFavoriteResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isFavourited: boolean;
  };
}

interface ParticipateInfoResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    eventId: string;
    userId: string;
    createdAt: string;
  } | null;
}

interface ParticipantCountResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    count: number;
  };
}

interface TrackEventResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: null | { id: string };
}

interface CheckTrackResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isTracked: boolean;
  };
}

interface CheckSelfResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isSelf: boolean;
  };
}

interface FollowResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    isFollow: boolean;
    isFollowed: boolean;
    createdAt: string;
    user_1: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    user_2: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
}

interface CheckFollowResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    isFollow: boolean;
    isCreated: boolean;
    relationshipId?: string;
  };
}

export const eventService = {
  getMyEvents: async (page: number = 1): Promise<EventListResponse> => {
    try {
      const response = await axiosInstance.get(`/events/my-events?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFavoriteEvents: async (): Promise<FavoriteEventListResponse> => {
    try {
      const response = await axiosInstance.get('/favourite-events/my-events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getParticipatedEvents: async (): Promise<FavoriteEventListResponse> => {
    try {
      const response = await axiosInstance.get('/participated-events/my-events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTrackedEvents: async (page: number = 1) => {
    try {
      const response = await axiosInstance.get(`/tracked-events/my-events?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEventDetail: async (eventId: string): Promise<EventDetailResponse> => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getEventDetail:', error);
      throw error;
    }
  },

  participateEvent: async (eventId: string): Promise<ParticipateResponse> => {
    try {
      console.log('=== Participate Event API ===');
      console.log('Request:', { eventId });
      const response = await axiosInstance.post('/participated-events', { eventId });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Participate Event Error:', error);
      throw error;
    }
  },

  checkParticipate: async (eventId: string): Promise<CheckParticipateResponse> => {
    try {
      console.log('=== Check Participate API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.get(`/participated-events/check/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Check Participate Error:', error);
      throw error;
    }
  },

  cancelParticipate: async (eventId: string): Promise<ParticipateResponse> => {
    try {
      console.log('=== Cancel Participate API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.delete(`/participated-events/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Cancel Participate Error:', error);
      throw error;
    }
  },

  favoriteEvent: async (eventId: string): Promise<FavoriteResponse> => {
    try {
      const response = await axiosInstance.post('/favourite-events', { eventId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkFavorite: async (eventId: string): Promise<CheckFavoriteResponse> => {
    try {
      const response = await axiosInstance.get(`/favourite-events/check/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  unfavoriteEvent: async (eventId: string): Promise<FavoriteResponse> => {
    try {
      console.log('=== Unfavorite Event API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.delete(`/favourite-events/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Unfavorite Event Error:', error);
      throw error;
    }
  },

  getParticipateInfo: async (eventId: string): Promise<ParticipateInfoResponse> => {
    try {
      console.log('=== Get Participate Info API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.get(`/participated-events/info/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get Participate Info Error:', error);
      throw error;
    }
  },

  getParticipantCount: async (eventId: string): Promise<ParticipantCountResponse> => {
    try {
      console.log('=== Get Participant Count API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.get(`/participated-events/count/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get Participant Count Error:', error);
      throw error;
    }
  },

  trackEvent: async (eventId: string): Promise<TrackEventResponse> => {
    try {
      console.log('=== Track Event API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.post('/tracked-events', { eventId });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Track Event Error:', error);
      throw error;
    }
  },

  checkTrack: async (eventId: string): Promise<CheckTrackResponse> => {
    try {
      console.log('=== Check Track API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.get(`/tracked-events/check/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Check Track Error:', error);
      throw error;
    }
  },

  untrackEvent: async (eventId: string): Promise<TrackEventResponse> => {
    try {
      console.log('=== Untrack Event API ===');
      console.log('Event ID:', eventId);
      const response = await axiosInstance.delete(`/tracked-events/${eventId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Untrack Event Error:', error);
      throw error;
    }
  },

  checkSelf: async (userId: string): Promise<CheckSelfResponse> => {
    try {
      console.log('=== Check Self API ===');
      console.log('User ID:', userId);
      const response = await axiosInstance.get(`/follower/check-self/${userId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Check Self Error:', error);
      throw error;
    }
  },

  followUser: async (userId: string): Promise<FollowResponse> => {
    try {
      console.log('=== Follow User API ===');
      console.log('User ID:', userId);
      const response = await axiosInstance.post('/follower', { userId });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Follow User Error:', error);
      throw error;
    }
  },

  checkFollow: async (userId: string): Promise<CheckFollowResponse> => {
    try {
      console.log('=== Check Follow API ===');
      console.log('User ID:', userId);
      const response = await axiosInstance.get(`/follower/isFavourite/${userId}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Check Follow Error:', error);
      throw error;
    }
  },

  unfollowUser: async (userId: string): Promise<FollowResponse> => {
    try {
      console.log('=== Unfollow User API ===');
      console.log('Endpoint:', `/follower/${userId}`);
      console.log('Method:', 'PATCH');
      console.log('User ID:', userId);
      
      const response = await axiosInstance.patch(`/follower/${userId}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Unfollow User Error:', error);
      throw error;
    }
  },

  createEvent: async (formData: FormData): Promise<EventDetailResponse> => {
    try {
      const response = await axiosInstance.post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateEvent: async (eventId: string, formData: FormData): Promise<EventDetailResponse> => {
    try {
      const response = await axiosInstance.patch(`/events/${eventId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchEventsByLocation: async (
    location: string,
    radius: number = 5,
    page: number = 1,
    limit: number = 20
  ): Promise<NearbyEventListResponse> => {
    try {
      console.log('Searching events with location:', location);
      
      // Validate and adjust parameters
      const validRadius = Math.min(Math.max(Math.floor(radius), 1), 100);
      const validPage = Math.max(Math.floor(page), 1);
      const validLimit = Math.min(Math.max(Math.floor(limit), 1), 100);
      
      const params = new URLSearchParams({
        location: location,
        radius: validRadius.toString(),
        page: validPage.toString(),
        limit: validLimit.toString()
      });
      
      const url = `/events/search/location?${params.toString()}`;
      console.log('API URL:', url);
      
      const response = await axiosInstance.get(url);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching events:', error.response?.data || error.message);
      throw error;
    }
  },

  getCurrentMonthEvents: async (page: number = 1, limit: number = 10): Promise<NearbyEventListResponse> => {
    try {
      console.log('=== Get Current Month Events API ===');
      console.log('Page:', page, 'Limit:', limit);
      const response = await axiosInstance.get(`/events/list/current-month?page=${page}&limit=${limit}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching current month events:', error);
      throw error;
    }
  },

  getUpcomingEvents: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axiosInstance.get(`/events/list/upcoming?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get upcoming events error:', error);
      throw error;
    }
  }
}; 