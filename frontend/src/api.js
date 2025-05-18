import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  // ↓ Supprimez withCredentials (pas nécessaire pour les tokens)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Token dans le header
  }
  return config;
});

export default api;