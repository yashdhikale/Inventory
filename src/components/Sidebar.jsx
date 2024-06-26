// src/components/Sidebar.jsx

import React from 'react';
import '../App.css';

const Sidebar = ({ onViewChange }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><button onClick={() => onViewChange('home')}>Home</button></li>
        <li><button onClick={() => onViewChange('viewProducts')}>View Products</button></li>
        <li><button onClick={() => onViewChange('addInventory')}>Restock Inventory</button></li>
        <li><button onClick={() => onViewChange('update')}>Update Inventory</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
