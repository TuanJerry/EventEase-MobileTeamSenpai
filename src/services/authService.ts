import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axios';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface LogoutResponse {
  message: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        username,
        password,
      });

      const { access_token, refresh_token } = response.data;
      
      // Lưu token vào AsyncStorage
      await AsyncStorage.multiSet([
        ['access_token', access_token],
        ['refresh_token', refresh_token],
      ]);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      const [accessToken, refreshToken] = await AsyncStorage.multiGet([
        'access_token',
        'refresh_token',
      ]);

      if (accessToken[1] && refreshToken[1]) {
        await axiosInstance.post<LogoutResponse>('/auth/logout', {
          accessToken: accessToken[1],
          refreshToken: refreshToken[1],
        });
      }

      // Xóa token khỏi AsyncStorage
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    } catch (error) {
      // Vẫn xóa token ngay cả khi API thất bại
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>('/auth/refresh', {
        refreshToken,
      });

      const { access_token, refresh_token } = response.data;
      
      await AsyncStorage.multiSet([
        ['access_token', access_token],
        ['refresh_token', refresh_token],
      ]);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('access_token');
      return !!token;
    } catch {
      return false;
    }
  },
}; 