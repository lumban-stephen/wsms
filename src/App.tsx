import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import Navbar from './components/lmaonavbar';
import AdminDash from './pages/admin/admindash';
import AdminMWSEmpty from './pages/adminMainWSEmpty/index';
import AdminMWSLists from './pages/adminMainWSLists/index';
import Modal from './components/viewModalPending';
import WSList from './pages/adminNew/MainWSLists';
import TableWSList from './components/TableWSList';
import './App.css';

function App() {
  // const [setActiveTab] = useState<string | null>(null);

  // const handleTabChange = (tab: string) => {
  //   setActiveTab(tab);
  // };

  return (
    <div>
      <Navbar/>
      
      <TableWSList></TableWSList>
      
    </div>
  );
}

export default App;
