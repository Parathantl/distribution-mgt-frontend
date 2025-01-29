import { useEffect, useState } from 'react';
import { getInvoices, deleteInvoice } from '../../api/invoiceService';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';

interface Invoice {
  id: number;
  shop_name: string;
  total_amount: string;
  created_at: string;
}

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteInvoice(id.toString());
    setInvoices(invoices.filter((invoice: Invoice) => invoice.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice List</h1>
      <Button
        variant="primary"
        onClick={() => navigate('/add-invoice')}
        className="mb-4"
      >
        Add New Invoice
      </Button>
      <div className="grid grid-cols-1 gap-4">
        {invoices.map((invoice: Invoice) => (
          <div
            key={invoice.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">Shop: {invoice.shop_name}</h2>
              <p>Total: Rs. {parseFloat(invoice.total_amount).toFixed(2)}</p>
              <p className="text-gray-500">
                Date: {new Date(invoice.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/invoices/${invoice.id}`)}
              >
                View Details
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(invoice.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
