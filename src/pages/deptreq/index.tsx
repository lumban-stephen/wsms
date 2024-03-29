import React, { useState } from 'react';
import PendingRequestList from '../../components/pendingrequestlist';
import RequestDetails from '../../components/requestdetails';
import RequestWorkingScholar from '../../components/requestworkingscholar';
import NavBar from '../../components/navbar';

const DeptReq: React.FC = () => {
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  return (
    <>
    <NavBar activeTab={''} handleTabChange={function (tab: string): void {
        throw new Error('Function not implemented.');
      } }></NavBar>
    <div style={{ display: 'flex' }}>
      <PendingRequestList />
      {showRequestDetails ? (
        <RequestDetails
          requestId="REQ001"
          requestName="New Computers"
          requestType="Replacement"
          quantity={10}
        />
      ) : (
        <RequestWorkingScholar />
      )}
    </div>
    </>
  );
}

export default DeptReq;