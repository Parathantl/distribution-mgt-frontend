import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceById } from '../../api/invoiceService';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Invoice {
  id: string;
  shop_name: string;
  created_at: string;
  total_amount: string;
  items: {
    item_id: string;
    item_name: string;
    unit_price: string;
    quantity: number;
  }[];
}

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [invoice, setInvoice] = useState<Invoice | null>(null);

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
  
    // ** Add Company Name & Address **
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Parathan Traders', 105, 15, { align: 'center' });
  
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Kilinnochchi West, Kilinochchi', 105, 22, { align: 'center' });
    doc.text('Tel: 0774545789', 105, 28, { align: 'center' });
  
    // ** Invoice Title **
    doc.setFontSize(20);
    doc.setTextColor(20);
    doc.text('SALES INVOICE', 105, 40, { align: 'center' });
  
    // ** Invoice & Shop Details **
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 50);
    doc.text(`Shop Name: ${invoice.shop_name}`, 20, 58);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 20, 66);
  
    // ** Invoice Table (Item Details) **
    const tableColumn = ['Item Name', 'Unit Price (Rs.)', 'Quantity', 'Total (Rs.)'];
    const tableRows: (string | number)[][] = [];
  
    invoice.items.forEach((item: { item_id: string; item_name: string; unit_price: string; quantity: number }) => {
      const itemData = [
        item.item_name,
        parseFloat(item.unit_price).toFixed(2),
        item.quantity,
        (parseFloat(item.unit_price) * item.quantity).toFixed(2),
      ];
      tableRows.push(itemData);
    });
  
    doc.autoTable({
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Black header with white text
      styles: { fontSize: 11, halign: 'center' },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'right' }, 2: { halign: 'center' }, 3: { halign: 'right' } },
    });
  
    // ** Total Calculation **
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Items: ${invoice.items.length}`, 20, finalY);
    doc.text(`Subtotal: Rs. ${parseFloat(invoice.total_amount).toFixed(2)}`, 150, finalY);
    finalY += 8;
  
    // ** Add Footer **
    doc.setDrawColor(0);
    doc.line(20, finalY, 190, finalY);
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, finalY + 10, { align: 'center' });
  
    // ** Save the Document **
    doc.save(`Invoice_${invoice.id}.pdf`);
  };
  

  if (!invoice) {
    return <div className="p-6 text-center">Loading invoice...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice Details</h1>
      <div className="border p-4 rounded shadow mb-4">
        <h2 className="font-bold text-lg">Shop: {invoice.shop_name}</h2>
        <p className="text-gray-500">Date: {new Date(invoice.created_at).toLocaleDateString()}</p>
        <p className="text-gray-500">Invoice ID: {invoice.id}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Items</h3>
      <div className="grid grid-cols-1 gap-4">
        {invoice.items.map((item: { item_id: string; item_name: string; unit_price: string; quantity: number }) => (
          <div
            key={item.item_id}
            className="p-4 border rounded shadow flex justify-between"
          >
            <div>
              <p className="font-medium">{item.item_name}</p>
              <p className="text-gray-500">Price: Rs. {parseFloat(item.unit_price).toFixed(2)}</p>
            </div>
            <div>
              <p>Quantity: {item.quantity}</p>
              <p>
                Subtotal: Rs. {(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t-2 border-gray-200">
        <h3 className="text-xl font-bold text-right">
          Total: Rs. {parseFloat(invoice.total_amount).toFixed(2)}
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
