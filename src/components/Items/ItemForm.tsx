import React, { useState, useEffect } from 'react';
import { addItem, updateItem, getItemById } from '../../api/itemService';
import Input from '../../UI/Input';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [stock, setStock] = useState(0);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchItemData = async () => {
        try {
          const itemData = await getItemById(id || ''); // Ensure id is always a string
          setName(itemData.item_name);
          setPrice(itemData.unit_price);
          setMrp(itemData.mrp);
          setStock(itemData.stock);
          setExpiryDate(itemData.expiry_date ? new Date(itemData.expiry_date) : null);
        } catch (error) {
          console.error('Failed to fetch item data', error);
        }
      };
      fetchItemData();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemPayload = {
      itemName: name,
      unitPrice: parseFloat(price.toString()),
      mrp: parseFloat(mrp.toString()),
      stock: parseFloat(stock.toString()),
      expiryDate: expiryDate ? expiryDate.toISOString().split('T')[0] : ''
    };

    try {
      if (isEditMode) {
        await updateItem(id || '', itemPayload);
      } else {
        await addItem(itemPayload);
      }
      resetForm();
      navigate('/products');
    } catch (error) {
      console.error('Failed to submit item', error);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice(0);
    setMrp(0);
    setStock(0);
    setExpiryDate(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isEditMode ? 'Edit Item' : 'Add New Item'}
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Product Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product name"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Price (Rs.)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Enter price"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* MR Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">MR Price (Rs.)</label>
          <Input
            type="number"
            value={mrp}
            onChange={(e) => setMrp(parseFloat(e.target.value))}
            placeholder="Enter MR Price"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Stock Quantity</label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseFloat(e.target.value))}
            placeholder="Enter stock quantity"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Expiry Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
          <DatePicker
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select expiry date"
            className="w-full p-2 border rounded"
            isClearable
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
        >
          {isEditMode ? 'Update Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;