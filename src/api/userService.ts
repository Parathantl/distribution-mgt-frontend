import api from './api';

export const createUser = async (user: { username: string; email: string, password: string }) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await api.post('/users/login', credentials, { withCredentials: true });
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get('/users/check-auth');
  return response;
}