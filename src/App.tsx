import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/lmaonavbar';
import { AuthContext } from './utils/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
      <div className="App">
        {isAuthenticated && <Navbar activeTab={activeTab || ''} handleTabChange={handleTabChange} />}
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
