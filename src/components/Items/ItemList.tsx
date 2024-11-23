import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../../api/itemService';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setItems(items.filter((item: any) => item._id !== id));
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item._id}>
            {item.name} - ${item.price} - Stock: {item.stock}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
