import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  googleAuth: (credential: string) => api.post('/auth/google', { credential }),
  getProfile: (id: string) => api.get(`/auth/profile/${id}`),
};

// Item APIs
export const itemAPI = {
  getAll: (params?: any) => api.get('/items', { params }),
  getById: (id: string) => api.get(`/items/${id}`),
  create: (data: any) => api.post('/items', data),
  update: (id: string, data: any) => api.put(`/items/${id}`, data),
  delete: (id: string) => api.delete(`/items/${id}`),
  getSellerItems: () => api.get('/items/seller/my-items'),
};

// AI APIs
export const aiAPI = {
  analyzeListing: (data: {
    title: string;
    shortDesc?: string;
    template?: string;
    length?: string;
  }) => api.post('/ai/analyze-listing', data),
  getRecommendations: (itemId: string) => api.get(`/ai/recommendations/${itemId}`),
  chat: (data: {
    message: string;
    history: { role: string; content: string }[];
  }) => api.post('/ai/chat', data),
};