import axiosInstance from './axios';
import { UserProfile, UserProfileResponse } from '../types/user';

export const userService = {
  async getMyProfile(): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get<UserProfileResponse>('/users/my-info');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
}; 