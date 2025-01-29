import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../../api/itemService';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';

interface Item {
  id: number;
  item_name: string;
  unit_price: string;
  stock: string;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteItem(id.toString());
    setItems(items.filter((item: Item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Item List</h1>

      <Button
        variant="primary"
        onClick={() => navigate('/add-item')}
        className="mb-4"
      >
        Add New Item
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: Item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{item.item_name}</h2>
              <p>Price: Rs. {parseFloat(item.unit_price).toFixed(2)}</p>
              <p>Stock: {item.stock}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
