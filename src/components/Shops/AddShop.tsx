import React, { useState } from 'react';
import { addShop } from '../../api/shopService';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

const AddShop = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addShop({ name, location });
    navigate('/');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Shop</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Shop Name"
          placeholder="Enter shop name"
          required
        />
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
          placeholder="Enter location"
          required
        />
        <br/>
        <br/>
        <Button type="submit" variant="primary">
          Add Shop
        </Button>
      </form>
    </div>
  );
};

export default AddShop;
