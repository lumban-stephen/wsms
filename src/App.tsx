import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import './App.css';
import NavBarDept from "./components/navbar-dept";

function App() {
  const [activeTab, setActiveTab] = useState('Announcements');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBarDept activeTab={activeTab} handleTabChange={handleTabChange} />
      </header>
    </div>
  );
}

export default App;
