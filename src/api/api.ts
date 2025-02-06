import axios from 'axios';

const api = axios.create({
  baseURL: 'https://distribution-mgt-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Enables sending cookies
});

export default api;
