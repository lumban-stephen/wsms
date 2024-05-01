import React from 'react';
import logo from './logo.svg';
import Navbar from './components/MWSNavbar'
import PaperStyle from './components/MWSPaper'
import TableStyle from './components/MWSTable'
import MaintainWS from './pages/admin/MaintainWS'
import MaintainWSEmpty from './pages/admin/MaintainWSEmpty'
import './App.css';

function App() {
  return (
    <div>
      <Navbar/>
      <MaintainWS></MaintainWS>
      
    </div>
  );
}

export default App;
