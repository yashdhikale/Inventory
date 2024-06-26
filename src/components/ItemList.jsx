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
  const [showAlert, setShowAlert] = useState(false); // State to control alert display

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
  const handleIncrement = (itemId) => {
    const item = items.find(item => item.id === itemId);
    dispatch(updateItem(itemId, { ...item, quantity: item.quantity + 1 }));
  };
  const handleDecrement = (itemId) => {
    const item = items.find(item => item.id === itemId);
    if (item.quantity > 0) {
      dispatch(updateItem(itemId, { ...item, quantity: item.quantity - 1 }));
    }
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
      <li className="list-header">
          <div>Name</div>
          <div>Quantity</div>
        </li>
        {filteredItemsByName.map(item => (
          <li key={item.id} className="list-item">
                <div className="item-details">
             <span className="item-name">{item.name}</span>
             <span className="item-quantity">{item.quantity}</span>
             </div>
            {view === 'update' && (
              <div className="item-actions">
                <button className="edit" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="remove" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            )}
             {view === 'addInventory' && (
              <div className="item-actions">
                <button className="increment" onClick={() => handleIncrement(item.id)}>+</button>
                <button className="decrement" onClick={() => handleDecrement(item.id)}>-</button>
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