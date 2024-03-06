import React from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import Register from './pages/register_contactform';
import MaintainWSEmpty from './pages/listofWorking/index'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MaintainWSEmpty></MaintainWSEmpty>
      </header>
    </div>
  );
}

export default App;
