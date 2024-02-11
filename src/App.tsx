import React from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import './App.css';
import Signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Signup/>
      </header>
    </div>
  );
}

export default App;
