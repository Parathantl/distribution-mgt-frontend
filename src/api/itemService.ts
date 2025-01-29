import api from './api';

// Fetch all items
export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

// Add a new item
export const addItem = async (item: { itemName: string; unitPrice: number; stock: number }) => {
  const response = await api.post('/items', item);
  return response.data;
};

// Update an item
export const updateItem = async (id: string, item: { name: string; price: number; stock: number }) => {
  const response = await api.put(`/items/${id}`, item);
  return response.data;
};

// Delete an item
export const deleteItem = async (id: string) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};
