import React, { useState } from 'react';
import logo from './logo.svg';
import PendingRequestList from './components/pendingrequestlist';
import RequestDetails from './components/requestdetails';
import RequestWorkingScholar from './components/requestworkingscholar';
import DeptReq from './pages/deptreq';

function App() {
  return (
    <div>
      <DeptReq></DeptReq>
    </div>
  );
}

export default App;
