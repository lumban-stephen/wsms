import React, { useState } from 'react';
import logo from './logo.svg';
import PendingRequestList from './components/pendingrequestlist';
import RequestDetails from './components/requestdetails';
import RequestWorkingScholar from './components/requestworkingscholar';
import DeptAnnounce from './pages/dept-announce';

function App() {
  return (
    <div>
      <DeptAnnounce></DeptAnnounce>
    </div>
  );
}

export default App;
