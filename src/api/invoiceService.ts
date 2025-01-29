import api from './api';

interface Item {
  _id: string;
  item_name: string;
  unit_price: number;
}

export interface InvoiceItem {
  item: Item;
  quantity: number;
}

interface InvoicePayload {
  shop: string;
  items: InvoiceItem[];
  totalAmount: number;
}

// Fetch all invoices
export const getInvoices = async () => {
  const response = await api.get('/invoices');
  return response.data;
};

// Add a new invoice
export const addInvoice = async (invoice: InvoicePayload) => {
  const response = await api.post('/invoices', invoice);
  return response.data;
};

// Update an invoice
export const updateInvoice = async (id: string, invoice: InvoicePayload) => {
  const response = await api.put(`/invoices/${id}`, invoice);
  return response.data;
};

// Delete an invoice
export const deleteInvoice = async (id: string) => {
  const response = await api.delete(`/invoices/${id}`);
  return response.data;
};

export const getInvoiceById = async (id: string) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};