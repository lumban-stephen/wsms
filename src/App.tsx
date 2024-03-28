import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import Navbar from './components/lmaonavbar';
import AdminDash from './pages/admin/admindash';
import AdminMWSEmpty from './pages/admin/mainWSEmpty';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar activeTab={activeTab || ''} handleTabChange={handleTabChange} />
      <header className="App-header">
        <AdminMWSEmpty></AdminMWSEmpty>
      </header>
    </div>
  );
}

export default App;
