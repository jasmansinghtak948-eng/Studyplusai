/**
 * API client service for communicating with backend
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Authentication
  register: (data: any) => apiClient.post('/api/v1/auth/register', data),
  login: (data: any) => apiClient.post('/api/v1/auth/login', data),
  googleAuth: (data: any) => apiClient.post('/api/v1/auth/google', data),
  appleAuth: (data: any) => apiClient.post('/api/v1/auth/apple', data),
  getCurrentUser: () => apiClient.get('/api/v1/auth/me'),
  
  // Tests
  uploadTest: (data: any) => apiClient.post('/api/v1/tests/upload', data),
  getTestHistory: (limit?: number) => apiClient.get(`/api/v1/tests/history?limit=${limit || 10}`),
  getDashboard: () => apiClient.get('/api/v1/tests/dashboard'),
  getRecommendations: () => apiClient.get('/api/v1/tests/recommendations'),
};

export default apiClient;
