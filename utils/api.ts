import axios from 'axios';
const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true, // send cookies
});

// Add a request interceptor to attach access token
api.interceptors.request.use(
  async (config) => {
    // Try to get access token from cookies (browser only)
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(/accessToken=([^;]+)/);
      if (match) {
        config.headers['Authorization'] = `Bearer ${match[1]}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url?.includes('/refresh-token')) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/refresh-token');
        return api(originalRequest);
      } catch (refreshError) {
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
