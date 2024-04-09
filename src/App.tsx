import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import Navbar from './components/lmaonavbar';
import AdminDash from './pages/admin/admindash';
import AdminMWSEmpty from './pages/adminMainWSEmpty/index';
import AdminMWSLists from './pages/admin/mainWSLists';
import './App.css';

function App() {
  // const [setActiveTab] = useState<string | null>(null);

  // const handleTabChange = (tab: string) => {
  //   setActiveTab(tab);
  // };

  return (
    <div>
      <Navbar/>
      <header className="App-header">
        <AdminMWSEmpty></AdminMWSEmpty>
      </header>
    </div>
  );
}

export default App;
