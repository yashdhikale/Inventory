

import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [view, setView] = useState("home"); 
  const [searchTerm, setSearchTerm] = useState("");
  const items = useSelector((state) => state.items);

  const handleViewChange = (newView) => {
    setView(newView);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app-container">
      <Sidebar onViewChange={handleViewChange} />
      <div className="main-content">
      
        <div className="header">
          <h1>Inventory App</h1>
        </div>
        {view === "home" && (
          <>
            <div className="form-container">
              <AddItem />
            </div>
            <div className="item-list">
              <ItemList view={view} />
            </div>
          </>
        )}
        {view === "update" && (
          <div className="item-list">
            <ItemList view={view} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
