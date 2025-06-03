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

  updatePhone(phone: string): Promise<any> {
    return axiosInstance.put('/uses/phone', { phone });
  },

  updateProfile(data: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    location: string;
  }): Promise<any> {
    return axiosInstance.put('/users/profile', data);
  },

  updateAvatar(avatarUri: string): Promise<any> {
    const formData = new FormData();
    formData.append('avatar', {
      uri: avatarUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    return axiosInstance.put('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 