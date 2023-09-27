import React, { useState, useEffect } from 'react';

function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null);


  const initialData = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
  ];

  useEffect(() => {
    setItems(initialData);
  }, []);

  const addItem = () => {
    if (newItem.trim() !== '') {
      if (editItem) {
        const updatedItems = items.map((item) =>
          item.id === editItem.id ? { ...item, text: newItem } : item
        );
        setItems(updatedItems);
        setEditItem(null);
      } else {
        const newItemObject = { id: Date.now(), text: newItem };
        setItems([...items, newItemObject]);
      }
      setNewItem('');
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const editItemById = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem(itemToEdit.text);
      setEditItem(itemToEdit);
    }
  };

  return (
    <div>
      <h2>CRUD App</h2>
      <input
        type="text"
        placeholder="Add item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>{editItem ? 'Edit' : 'Add'}</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => editItemById(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
