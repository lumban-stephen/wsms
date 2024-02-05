import React from 'react';
import logo from './logo.svg';
import Login from './pages/login';
import './App.css';
import Application from './pages/application';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
        <Application></Application>
      </header>
    </div>
  );
}

export default App;
