import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import NavBarWS from './components/navbar-ws';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <NavBarWS activeTab={activeTab} handleTabChange={handleTabChange} />
      <header className="App-header">
        
        <Dept></Dept>
      </header>
    </div>
  );
}

export default App;
