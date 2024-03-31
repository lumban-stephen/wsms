import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from './components/lmaonavbar';
import { AuthContext } from './utils/AuthContext';
import Signup from './pages/signup';
import { Login } from '@mui/icons-material';
import Dept from './pages/dept';
import DeptAnnounce from './pages/dept-announce';
import MaintainWS from './pages/maintainWS';
import Register from './pages/register_contactform';
import Welcome from './pages/welcome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="App">
        {isAuthenticated && <Navbar activeTab={activeTab || ''} handleTabChange={handleTabChange} />}
        <Routes>
          {/* Optimized Route Definitions */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dept" element={<Dept />} />
          <Route path="/register" element={<Register />} />
          <Route path="/maintainWS" element={<MaintainWS />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dept-announce" element={<DeptAnnounce />} />
        </Routes>
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
