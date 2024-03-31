import React, { useState } from 'react';
import PendingRequestList from '../../components/pendingrequestlist';
import RequestDetails from '../../components/requestdetails';
import RequestWorkingScholar from '../../components/requestworkingscholar';

interface SelectedRequest {
  requestId: string;
  requestType: string;
  quantity: number;
}

const DeptReq: React.FC = () => {
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SelectedRequest | null>(null);

  const handleViewClick = (
    requestId: string,
    requestType: string,
    quantity: number
  ) => {
    setShowRequestDetails(true);
    setSelectedRequest({ requestId, requestType, quantity });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <PendingRequestList onViewClick={handleViewClick} />
        <div style={{ width: '75vw', padding: 2 }}>
          {showRequestDetails && selectedRequest ? (
            <RequestDetails
              requestId={selectedRequest.requestId}
              requestType={selectedRequest.requestType}
              quantity={selectedRequest.quantity}
            />
          ) : (
            <RequestWorkingScholar />
          )}
        </div>
      </div>
    </>
  );
};

export default DeptReq;