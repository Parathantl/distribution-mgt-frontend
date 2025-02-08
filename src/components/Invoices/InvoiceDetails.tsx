import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceById } from '../../api/invoiceService';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Invoice {
  id: string;
  shop_name: string;
  location: string;
  created_at: string;
  total_amount: string;
  items: {
    item_id: string;
    item_name: string;
    mrp: string;
    unit_price: string;
    quantity: number;
    total_price: string;
  }[];
}

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);  // State to hold PDF Blob URL

  useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        const data = await getInvoiceById(id);
        setInvoice(data);
      }
    };

    fetchInvoice();
  }, [id]);

  const generateInvoicePDF = () => {
    if (!invoice) return;
  
    // ** Detect Screen Size to Set PDF Dimensions **
    const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  
    // ** Define PDF Size Based on Device **
    const pdfSize = isMobile
      ? [612, 864]  // German Std Fan Fold size (8.5 x 12 inches in points)
      : 'a4';       // A4 size for desktop
  
    // ** Initialize jsPDF with Dynamic Page Size **
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',  // Points (1 pt = 1/72 inch)
      format: pdfSize,
    });
  
    doc.setFont('courier');
    doc.setFontSize(14);
  
    // ** Add Company Name & Address **
    doc.setFontSize(isMobile ? 24 : 32);  // Adjust font size for mobile
    doc.text('Haritdra Distributors', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
  
    doc.setFontSize(isMobile ? 10 : 12);
    doc.text('"Solar Farm", 3 1/4 Mile Post, Mannar Road', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });
    doc.text('Nelukkulam, Vavuniya.', doc.internal.pageSize.getWidth() / 2, 65, { align: 'center' });
    doc.text('024 222 4777     ,     0774656974', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });
  
    doc.text('VAT No: 106828814-7000', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

  // Get total page width
  const pageWidth = doc.internal.pageSize.width;

  // Define column widths as percentages
  const firstColumnWidth = pageWidth * 0.6;  // 60% of the page width
  const secondColumnWidth = pageWidth * 0.4; // 40% of the page width

  // ** Invoice & Customer Details as a Table **
  const headerTable = [
    [
      { content: `Customer Name: ${invoice.shop_name}`, styles: { halign: 'left' } },
      { content: `Invoice No: Rep/HDV/${invoice.id}`, styles: { halign: 'left' } },
    ],
    [
      { content: `Customer Address: ${invoice.location}`, styles: { halign: 'left' } },
      { content: `Invoice Date: ${new Date(invoice.created_at).toLocaleDateString()}`, styles: { halign: 'left' } },
    ],
    [
      { content: `Customer Number:: ${invoice.shop_name}`, styles: { halign: 'left' } },
    ]
  ];

  doc.autoTable({
    startY: 110,
    head: [],
    body: headerTable,
    theme: 'plain',
    styles: {
      font: 'courier',
      fontSize: isMobile ? 9 : 11,
      cellPadding: isMobile ? 1 : 2,
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: firstColumnWidth },  // First column takes 60% of the page
      1: { cellWidth: secondColumnWidth }, // Second column takes 40% of the page
    },
  });
  
    // ** Invoice Table (Product Details) **
    const tableColumn = ['No.', 'Product Name', 'MRP', 'Qty', 'Unit Price', 'Total Amount'];
    const tableRows: (string | number)[][] = [];
  
    invoice.items.forEach((item, index) => {
      const totalAmount = (parseFloat(item.total_price));
      const itemData = [
        index + 1,
        item.item_name,
        parseFloat(item.mrp).toFixed(2),
        `${item.quantity}`,
        parseFloat(item.unit_price).toFixed(2),
        totalAmount.toFixed(2),
      ];
      tableRows.push(itemData);
    });
  
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', 
      headStyles: { 
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineWidth: 0.5,
      },
      styles: { 
        font: 'courier',
        fontSize: isMobile ? 9 : 11,
        halign: 'center',
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { halign: 'center' }, 
        1: { halign: 'left' },   
        2: { halign: 'right' },  
        3: { halign: 'center' }, 
        4: { halign: 'right' },  
        5: { halign: 'right' },  
      },
    });
  
    // ** Total Calculation **
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(isMobile ? 12 : 14);
    doc.text(`Total: Rs. ${parseFloat(invoice.total_amount).toFixed(2)}`, doc.internal.pageSize.getWidth() - 40, finalY+10, { align: 'right' });
  
    // ** Footer for Signatures **
    finalY += 20;
        
    const footerY = finalY + 50;
  
    const columnWidth = pageWidth / 3;
    
    doc.setFontSize(isMobile ? 10 : 12);
    doc.text('Customer Seal', columnWidth * 0.5, footerY, { align: 'center' });
    doc.text('Customer Signature', columnWidth * 1.5, footerY, { align: 'center' });
    doc.text('Sales Rep Signature', columnWidth * 2.5, footerY, { align: 'center' });
  
    // ** Generate Blob for Preview **
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(blobUrl);
  };
  
  const downloadInvoice = () => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Invoice_${invoice?.id}.pdf`;
    link.click();
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

      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <div className="grid grid-cols-1 gap-4">
        {invoice.items.map((item) => (
          <div key={item.item_id} className="p-4 border rounded shadow flex justify-between">
            <div>
              <p className="font-medium">{item.item_name}</p>
              <p className="text-gray-500">Price: Rs. {parseFloat(item.unit_price).toFixed(2)}</p>
            </div>
            <div>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: Rs. {(parseFloat(item.unit_price) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t-2 border-gray-200">
        <h3 className="text-xl font-bold text-right">Total: Rs. {parseFloat(invoice.total_amount).toFixed(2)}</h3>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={generateInvoicePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Preview Invoice
        </button>

        {pdfUrl && (
          <button
            onClick={downloadInvoice}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download Invoice
          </button>
        )}
      </div>

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center mb-4">PDF Preview</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            title="Invoice PDF Preview"
            className="border rounded shadow"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
