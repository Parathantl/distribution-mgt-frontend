import React, { useEffect, useState } from 'react';
import { addInvoice } from '../../api/invoiceService';
import { getShops } from '../../api/shopService';
import { getItems } from '../../api/itemService';

// Define the types for shops and items
interface Shop {
  _id: string;
  name: string;
}

interface Item {
  _id: string;
  name: string;
  price: number;
}

interface InvoiceItem {
  item: string; // Item ID
  quantity: number;
}

const AddInvoice: React.FC = () => {
  const [shop, setShop] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([{ item: '', quantity: 0 }]);
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Fetch shops and items when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const shops = await getShops();
      const items = await getItems();
      setShopList(shops);
      setItemList(items);
    };

    fetchData();
  }, []);

  // Calculate total amount whenever items or their quantities change
  useEffect(() => {
    const calculateTotal = () => {
      const total = items.reduce((sum, currentItem) => {
        const itemDetails = itemList.find((i) => i._id === currentItem.item);
        return sum + (itemDetails?.price || 0) * currentItem.quantity;
      }, 0);
      setTotalAmount(total);
    };

    calculateTotal();
  }, [items, itemList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addInvoice({ shop, items, totalAmount });
    setShop('');
    setItems([{ item: '', quantity: 0 }]);
    setTotalAmount(0);
  };

  const handleItemChange = (index: number, key: keyof InvoiceItem, value: any) => {
    const updatedItems: any = [...items];
    updatedItems[index][key] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { item: '', quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Invoice</h2>

      {/* Shop Dropdown */}
      <div>
        <label>Shop:</label>
        <select value={shop} onChange={(e) => setShop(e.target.value)} required>
          <option value="">Select a Shop</option>
          {shopList.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items Section */}
      <h3>Items</h3>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          {/* Item Dropdown */}
          <select
            value={item.item}
            onChange={(e) => handleItemChange(index, 'item', e.target.value)}
            required
          >
            <option value="">Select an Item</option>
            {itemList.map((itemOption) => (
              <option key={itemOption._id} value={itemOption._id}>
                {itemOption.name} (${itemOption.price})
              </option>
            ))}
          </select>
          {/* Quantity Input */}
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
            placeholder="Quantity"
            required
          />
          <button type="button" onClick={() => handleRemoveItem(index)}>
            Remove
          </button>
        </div>
      ))}

      {/* Add Item Button */}
      <button type="button" onClick={handleAddItem}>
        Add More Items
      </button>

      {/* Total Amount Display */}
      <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>

      {/* Submit Button */}
      <button type="submit">Add Invoice</button>
    </form>
  );
};

export default AddInvoice;
