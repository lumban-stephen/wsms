import React, { useContext, useState } from 'react';
import logo from './logo.svg';

import './App.css';
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
  const [userdetailFk, setUserdetailFk] = useState(null); // Initial state
  const [token, setToken] = useState(null); // Initial state

  return (
      <div className="App">
        <Outlet context={{ userdetailFk, token }}/>
      </div>
  );
}

export default App;
