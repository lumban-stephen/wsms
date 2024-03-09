import React from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import  { Wsnavbar }  from './components/navbar-ws';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wsnavbar/>
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
