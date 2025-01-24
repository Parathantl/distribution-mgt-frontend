import React, { useEffect, useState } from 'react';
import { addInvoice } from '../../api/invoiceService';
import { getShops } from '../../api/shopService';
import { getItems } from '../../api/itemService';
import Input from '../../UI/Input';
import Select from '../../UI/Select';

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
  item: string;
  quantity: number;
}

const AddInvoice: React.FC = () => {
  const [shop, setShop] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([{ item: '', quantity: 0 }]);
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const shops = await getShops();
      const items = await getItems();
      setShopList(shops);
      setItemList(items);
    };

    fetchData();
  }, []);

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
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

      {/* Shop Dropdown */}
      <Select
        label="Shop"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
        options={shopList.map((s) => ({ value: s._id, label: s.name }))}
        required
      />

      {/* Items Section */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          {/* Item Dropdown */}
          <Select
            value={item.item}
            onChange={(e) => handleItemChange(index, 'item', e.target.value)}
            options={itemList.map((itemOption) => ({
              value: itemOption._id,
              label: `${itemOption.name} ($${itemOption.price})`,
            }))}
            required
          />
          {/* Quantity Input */}
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
            placeholder="Quantity"
            required
          />
          <button
            type="button"
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => handleRemoveItem(index)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Item Button */}
      <button
        type="button"
        onClick={handleAddItem}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add More Items
      </button>

      {/* Total Amount Display */}
      <h4 className="text-lg font-semibold mt-4">Total Amount: ${totalAmount.toFixed(2)}</h4>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
      >
        Add Invoice
      </button>
    </form>
  );
};

export default AddInvoice;
