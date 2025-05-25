import axiosInstance from './axios';
import { EventListResponse, FavoriteEventListResponse } from '../types/event';
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

  getEventDetail: async (eventId: string): Promise<Event | null> => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error in getEventDetail:', error);
      return null;
    }
  }
}; 