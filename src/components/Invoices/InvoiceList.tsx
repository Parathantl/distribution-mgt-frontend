import { useEffect, useState } from 'react';
import { getInvoices, deleteInvoice } from '../../api/invoiceService';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteInvoice(id);
    setInvoices(invoices.filter((invoice: any) => invoice._id !== id));
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
        {invoices.map((invoice: any) => (
          <div
            key={invoice._id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">Shop: {invoice.shop.name}</h2>
              <p>Total: ${invoice.totalAmount.toFixed(2)}</p>
              <p className="text-gray-500">
                Date: {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={() => navigate(`/invoices/${invoice._id}`)}
              >
                View Details
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(invoice._id)}
                className="ml-2"
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
