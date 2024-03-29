import React, { useState } from 'react';
import logo from './logo.svg';
import PendingRequestList from './components/pendingrequestlist';

function App() {

  return (
    <div style={{display: 'flex'}}>

      <PendingRequestList></PendingRequestList>

    </div>
  );
}

export default App;
