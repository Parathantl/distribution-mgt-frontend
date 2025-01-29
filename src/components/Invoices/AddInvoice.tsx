import React, { useEffect, useState } from 'react';
import { addInvoice } from '../../api/invoiceService';
import { getShops } from '../../api/shopService';
import { getItems } from '../../api/itemService';
import Input from '../../UI/Input';
import Select from '../../UI/Select';

interface Shop {
  id: number;
  shop_name: string;
}

interface Item {
  id: number;
  item_name: string;
  unit_price: string;
  stock: string;
}

interface InvoiceItem {
  item_id: number;
  item_name: string;
  unit_price: string;
  quantity: number;
}

const AddInvoice: React.FC = () => {
  const [shop, setShop] = useState<number | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([{ item_id: 0, item_name: '', unit_price: '', quantity: 1 }]);
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
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    const total = items.reduce((sum, currentItem) => sum + (parseFloat(currentItem.unit_price) * currentItem.quantity), 0);
    setTotalAmount(total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shop !== null) {
      await addInvoice({ shop, items, totalAmount });
      setShop(null);
      setItems([{ item_id: 0, item_name: '', unit_price: '', quantity: 1 }]);
      setTotalAmount(0);
    }
  };

  const handleItemChange = (index: number, selectedItemId: number) => {
    const selectedItem = itemList.find(itemOption => itemOption.id === selectedItemId);
    if (selectedItem) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = { 
          item_id: selectedItem.id,
          item_name: selectedItem.item_name, 
          unit_price: selectedItem.unit_price, 
          quantity: updatedItems[index].quantity 
        };
        return updatedItems;
      });
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = Math.max(1, value);
      return updatedItems;
    });
  };

  const handleAddItem = () => {
    setItems([...items, { item_id: 0, item_name: '', unit_price: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

      <Select
        label="Shop"
        value={shop ? shop.toString() : ''}
        onChange={(e) => setShop(Number(e.target.value))}
        options={shopList.map((s) => ({ value: s.id.toString(), label: s.shop_name }))}
        required
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <Select
            value={item.item_id ? item.item_id.toString() : ''}
            onChange={(e) => handleItemChange(index, Number(e.target.value))}
            options={[...itemList.map((itemOption) => ({
              value: itemOption.id.toString(),
              label: `${itemOption.item_name} (Rs. ${itemOption.unit_price})`,
            }))]}
            required
          />
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
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

      <button
        type="button"
        onClick={handleAddItem}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add More Items
      </button>

      <h4 className="text-lg font-semibold mt-4">Total Amount: Rs. {totalAmount.toFixed(2)}</h4>

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
