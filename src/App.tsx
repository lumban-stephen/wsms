import React from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import dotenv from 'dotenv';


dotenv.config();


function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Outlet />
      </header>
    </div>
  );
}

export default App;
