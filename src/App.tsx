import React, {useState} from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import Navbar from './components/lmaonavbar';
import AdminDash from './pages/admin/admindash';
import AdminMWSEmpty from './pages/admin/mainWSEmpty';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tab: string) => { // Define the type for tab
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar activeTab={activeTab} handleTabChange={handleTabChange} /> {/* Pass activeTab and handleTabChange */}
      <header className="App-header">
        <AdminMWSEmpty></AdminMWSEmpty>
      </header>
    </div>
  );
}

export default App;
