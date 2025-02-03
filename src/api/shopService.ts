import api from './api';

export const getShops = async () => {
  const response = await api.get('/shops');
  return response.data;
};

export const addShop = async (shop: { name: string; location: string, phone_number: string }) => {
  const response = await api.post('/shops', shop);
  return response.data;
};

export const updateShop = async (id: string, shop: { name: string; location: string }) => {
  const response = await api.put(`/shops/${id}`, shop);
  return response.data;
};

export const deleteShop = async (id: string) => {
  const response = await api.delete(`/shops/${id}`);
  return response.data;
};
