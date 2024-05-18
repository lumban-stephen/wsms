import React from 'react';
import logo from './logo.svg';
import Navbar from './components/MWSNavbar'
import PaperStyle from './components/MWSPaper'
import TableStyle from './components/MWSTable'
import MaintainWS from './pages/admin/MaintainWS'
import MaintainDept from './pages/maintainDept/index'
import './App.css';

function App() {
  return (
    <div>
      
      <MaintainDept></MaintainDept>
      
    </div>
  );
}

export default App;
