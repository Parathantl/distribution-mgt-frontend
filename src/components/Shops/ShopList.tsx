import { useEffect, useState } from 'react';
import { getShops, deleteShop } from '../../api/shopService';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      const data = await getShops();
      setShops(data);
    };
    fetchShops();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteShop(id);
    setShops(shops.filter((shop: any) => shop._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Shop List</h1>
      <Button
        variant="primary"
        onClick={() => navigate('/add-shop')}
        className="mb-4"
      >
        Add New Shop
      </Button>
      <div className="grid grid-cols-1 gap-4">
        {shops.map((shop: any) => (
          <div
            key={shop._id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{shop.name}</h2>
              <p>{shop.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopList;
