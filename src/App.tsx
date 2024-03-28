import React from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Dept from './pages/dept';
import Navbar from './components/lmaonavbar';
import './App.css';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <header className="App-header">
        <Dept></Dept>
      </header>
    </div>
  );
}

export default App;
