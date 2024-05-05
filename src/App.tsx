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
import MaintainWS from './pages/maintain-applicants';
import Register from './pages/register_contactform';
import Welcome from './pages/welcome';
import DeptReq from './pages/deptreq';
import ProtectedRoute from './utils/ProtectedRoute'; // Assuming ProtectedRoute is in utils folder


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [userdetailFk, setUserdetailFk] = useState(null); // Initial state
  const [token, setToken] = useState(null); // Initial state

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userdetailFk, token }}>
      <div className="App">
        {isAuthenticated && <Navbar activeTab={activeTab || ''} handleTabChange={handleTabChange} />}
        <Outlet context={{ userdetailFk, token }}/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
