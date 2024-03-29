import React, { useState } from 'react';
import PendingRequestList from '../../components/pendingrequestlist';
import RequestDetails from '../../components/requestdetails';
import RequestWorkingScholar from '../../components/requestworkingscholar';

const DeptReq: React.FC = () => {
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  return (
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
  );
}

export default DeptReq;