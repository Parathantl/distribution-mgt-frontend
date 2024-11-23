import React, { useState } from 'react';
import { updateItem } from '../../api/itemService';

const EditItem = ({ id, currentName, currentPrice, currentStock, onUpdate }: any) => {
  const [name, setName] = useState(currentName);
  const [price, setPrice] = useState(currentPrice);
  const [stock, setStock] = useState(currentStock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateItem(id, { name, price, stock });
    onUpdate();
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
      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditItem;
