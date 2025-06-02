import axiosInstance from './axios';
import { SearchResponse } from '../types/search.types';

export const searchService = {
  async searchEvents(searchQuery: string, page: number = 1): Promise<SearchResponse> {
    try {
      const response = await axiosInstance.get<SearchResponse>('/events', {
        params: { 
          search: searchQuery,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 