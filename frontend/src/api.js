import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  // Autorise l'envoi des credentials (cookies, etc.) dans les requêtes
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
