import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'https://distribution-mgt-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
