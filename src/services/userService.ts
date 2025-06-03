import axiosInstance from './axios';
import { resizeAvatar } from '../utils/createFormData';
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
    return axiosInstance.put('/users/phone', { phone });
  },

  updateProfile(data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    email: string;
  }): Promise<any> {
    return axiosInstance.put('/users/profile', data);
  },

  async updateAvatar(avatarUri: string): Promise<any> {
    const formData = new FormData();
    const resizedAvatar = await resizeAvatar(avatarUri);
    formData.append('avatar', resizedAvatar as any);
    return axiosInstance.put('/users/update-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 