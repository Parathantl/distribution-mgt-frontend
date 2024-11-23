import axios from 'axios';

const api = axios.create({
  baseURL: 'https://78b1-2402-4000-b2c0-40e9-4ec9-902e-9ecc-780b.ngrok-free.app/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
