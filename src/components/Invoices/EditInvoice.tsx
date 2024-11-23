import React, { useEffect, useState } from 'react';
import { getInvoices, deleteInvoice, updateInvoice } from '../../api/invoiceService';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);

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

  const handleEdit = (invoice: any) => {
    setIsEditing(true);
    setCurrentInvoice(invoice);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInvoice) {
      await updateInvoice(currentInvoice._id, {
        shop: currentInvoice.shop._id,
        items: currentInvoice.items,
      });
      setIsEditing(false);
      setCurrentInvoice(null);
      const updatedInvoices = await getInvoices();
      setInvoices(updatedInvoices);
    }
  };

  const handleItemChange = (index: number, key: string, value: any) => {
    if (!currentInvoice) return;
    const updatedItems = [...currentInvoice.items];
    updatedItems[index][key] = value;
    setCurrentInvoice({ ...currentInvoice, items: updatedItems });
  };

  return (
    <div>
      <h1>Invoices</h1>

      {isEditing && currentInvoice ? (
        <form onSubmit={handleUpdate}>
          <h2>Edit Invoice</h2>
          <div>
            <label>Shop ID: </label>
            <input
              type="text"
              value={currentInvoice.shop._id}
              disabled // Shop cannot be changed in this implementation
            />
          </div>
          {currentInvoice.items.map((item: any, index: number) => (
            <div key={index}>
              <label>Item ID:</label>
              <input
                type="text"
                value={item.item._id}
                disabled // Item ID is fixed in this implementation
              />
              <label>Quantity:</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
            </div>
          ))}
          <button type="submit">Update Invoice</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <ul>
          {invoices.map((invoice: any) => (
            <li key={invoice._id}>
              <p>
                Shop: {invoice.shop.name} - Total: ${invoice.totalAmount}
              </p>
              <ul>
                {invoice.items.map((item: any) => (
                  <li key={item.item._id}>
                    {item.item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleEdit(invoice)}>Edit</button>
              <button onClick={() => handleDelete(invoice._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
