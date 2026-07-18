import axios from 'axios';

const apiClient = axios.create({
  // By default during dev, this hits the proxy defined in vite.config.ts
  // In production, it falls back to the VITE_API_BASE_URL.
  baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || ''),
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized if necessary
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
