import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [view, setView] = useState("home");
  const [showAlert, setShowAlert] = useState(false);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleAddItem = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); 
    }, 3000); 
  };

  return (
    <div className="app-container">
      <Sidebar onViewChange={handleViewChange} />

      <div className="main-content">
        {view === "home" && (
          <>
        <div className="header">
          <h1>Inventory App</h1>
        </div>
            <div className="form-container">
              <AddItem onAdd={handleAddItem} />
            </div>
            {showAlert && (
              <div className="alert-message">
                <p>Item added successfully!</p>
              </div>
            )}
          </>
        )}
        {view === "update" && (
          <div className="item-list">
            <h2>Update Items</h2>
            <ItemList view={view} />
          </div>
        )}
        {view === "viewProducts" && (
          <div className="item-list">
            <h2>View Products</h2>
            <ItemList view={view} />
          </div>
        )}
          {view === "addInventory" && (
          <div className="item-list">
            <h2>Add Inventory</h2>
            {/* <AddItem onAdd={handleAddItem} /> */}
            <ItemList view={view} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
