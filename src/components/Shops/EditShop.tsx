import React, { useState } from 'react';
import { updateShop } from '../../api/shopService';

const EditShop = ({ id, currentName, currentLocation, onUpdate }: any) => {
  const [name, setName] = useState(currentName);
  const [location, setLocation] = useState(currentLocation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateShop(id, { name, location });
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Shop Name"
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <button type="submit">Update Shop</button>
    </form>
  );
};

export default EditShop;
