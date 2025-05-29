import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
// Hàng đợi các request đang chờ refresh token
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Lấy refresh_token từ AsyncStorage
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        
        // Không refresh nếu đang gọi API login, logout hoặc refresh
        if (['/auth/login', '/auth/logout', '/auth/refresh'].includes(originalRequest.url)) {
          return Promise.reject(error);
        }

        // Gọi API refresh với refresh_token lấy từ AsyncStorage
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: refreshToken
        });

        // Nhận token mới từ response
        const { access_token, refresh_token } = response.data;
        
        // Lưu token mới vào AsyncStorage
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);

        // Cập nhật header cho request gốc
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Xử lý các request đang chờ
        processQueue(null, access_token);
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh thất bại, xóa token và chuyển về login
        processQueue(refreshError, null);
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        
        // Thêm event để thông báo cho app biết cần logout
        const event = new Event('auth:logout');
        window.dispatchEvent(event);
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 