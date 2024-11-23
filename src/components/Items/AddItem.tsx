import React, { useState } from 'react';
import { addItem } from '../../api/itemService';

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem({ name, price, stock });
    setName('');
    setPrice(0);
    setStock(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
        required
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        placeholder="Stock"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
