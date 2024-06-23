

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, setEditMode, updateItem } from '../redux/actions';
import '../App.css';

const ItemList = ({ view }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const editItemId = useSelector(state => state.editItemId); 

  const [formData, setFormData] = useState({
    name: '',
    quantity: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (itemId) => {
    dispatch(setEditMode(itemId));
    const itemToEdit = items.find(item => item.id === itemId);
    setFormData({
      name: itemToEdit.name,
      quantity: itemToEdit.quantity
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(updateItem(editItemId, formData));
   
    setFormData({
      name: '',
      quantity: ''
    });
    dispatch(setEditMode(null)); 
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = view === 'update' ? items : items.filter(item => item.quantity > 0);

  const filteredItemsByName = filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="item-list">
   
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredItemsByName.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            {view === 'update' && (
              <div className="item-actions">
                <button className="edit" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="remove" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editItemId && (
        <div className="edit-form">
          <h2>Edit Item</h2>
          <form>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" />
            <button type="button" onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemList;
