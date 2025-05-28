import axiosInstance from './axios';
import { 
  EventListResponse, 
  FavoriteEventListResponse, 
  EventDetailResponse,
  CheckParticipatedResponse,
  CheckFavouritedResponse,
  DeleteResponse,
  ParticipateEventResponse,
  FavouriteEventResponse,
  CreateEventResponse,
  EventForm
} from '../types/event';
import { Event } from '../types/event';
import { TrackedEventsResponse } from '../types/event';
import { FavoriteEvent } from '../types/event';

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

  checkParticipated: async (eventId: string): Promise<CheckParticipatedResponse> => {
    try {
      const response = await axiosInstance.get(`/participated-events/check/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  participateEvent: async (eventId: string): Promise<ParticipateEventResponse> => {
    try {
      const response = await axiosInstance.post('/participated-events', { eventId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelParticipation: async (eventId: string): Promise<DeleteResponse> => {
    try {
      const response = await axiosInstance.delete(`/participated-events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkFavourited: async (eventId: string): Promise<CheckFavouritedResponse> => {
    try {
      const response = await axiosInstance.get(`/favourite-events/check/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToFavourites: async (eventId: string): Promise<FavouriteEventResponse> => {
    try {
      const response = await axiosInstance.post('/favourite-events', { eventId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromFavourites: async (eventId: string): Promise<DeleteResponse> => {
    try {
      const response = await axiosInstance.delete(`/favourite-events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (formData: FormData): Promise<CreateEventResponse> => {
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
  }
}; 