import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceById } from '../../api/invoiceService';
import { jsPDF } from 'jspdf';

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        const data = await getInvoiceById(id);
        setInvoice(data);
      }
    };

    fetchInvoice();
  }, [id]);

  const printInvoice = () => {
    if (!invoice) return;

    const doc = new jsPDF();

    // Add header
    doc.setFontSize(12);
    doc.text('Parathan Traders', 105, 10, { align: 'center' });
    doc.text('Kilinnochchi West, Kilinochchi', 105, 16, { align: 'center' });
    doc.text('Tel: 0774545789', 105, 22, { align: 'center' });
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 105, 28, {
      align: 'center',
    });

    // Add title
    doc.setFontSize(16);
    doc.text('Sales Invoice', 105, 40, { align: 'center' });

    // Add table headers
    doc.setFontSize(12);
    doc.text('Item Name', 20, 50);
    doc.text('Price', 80, 50);
    doc.text('Quantity', 120, 50);
    doc.text('Total', 160, 50);

    // Draw table contents
    let y = 60;
    invoice.items.forEach((item: any, index: number) => {
      doc.text(item.item.name, 20, y);
      doc.text(`$${item.item.price.toFixed(2)}`, 80, y);
      doc.text(`${item.quantity}`, 120, y);
      doc.text(`$${(item.item.price * item.quantity).toFixed(2)}`, 160, y);
      y += 10; // Move to the next row
    });

    // Add footer
    doc.text(`Line Count: ${invoice.items.length}`, 20, y + 10);
    doc.text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`, 20, y + 20);

    // Save and print the PDF
    doc.save('invoice.pdf');
  };

  if (!invoice) {
    return <div className="p-6 text-center">Loading invoice...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice Details</h1>
      <div className="border p-4 rounded shadow mb-4">
        <h2 className="font-bold text-lg">Shop: {invoice.shop.name}</h2>
        <p className="text-gray-500">Date: {new Date(invoice.date).toLocaleDateString()}</p>
        <p className="text-gray-500">Invoice ID: {invoice._id}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Items</h3>
      <div className="grid grid-cols-1 gap-4">
        {invoice.items.map((item: any) => (
          <div
            key={item.item._id}
            className="p-4 border rounded shadow flex justify-between"
          >
            <div>
              <p className="font-medium">{item.item.name}</p>
              <p className="text-gray-500">Price: ${item.item.price.toFixed(2)}</p>
            </div>
            <div>
              <p>Quantity: {item.quantity}</p>
              <p>
                Subtotal: ${(item.item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t-2 border-gray-200">
        <h3 className="text-xl font-bold text-right">
          Total: ${invoice.totalAmount.toFixed(2)}
        </h3>
      </div>

      <button
        onClick={printInvoice}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default InvoiceDetails;
