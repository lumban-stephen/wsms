import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import RequestDetails from './requestdetails';

interface PendingRequestProps {
  title: string;
  date: string;
  requestType: string;
  status: string;
  requestId: string;
  requestName: string;
  quantity: number;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  title,
  date,
  requestType,
  status,
  requestId,
  requestName,
  quantity,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewClick = () => {
    setShowDetails(true);
  };

  return (
    <Box
      sx={{
        border: '1px solid gray',
        borderRadius: 1,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      {showDetails ? (
        <RequestDetails
          requestId={requestId}
          requestName={requestName}
          requestType={requestType}
          quantity={quantity}
        />
      ) : (
        <>
          <div>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{date}</Typography>
            <Typography variant="body2">Request Type: {requestType}</Typography>
            <Typography variant="body2">Status: {status}</Typography>
          </div>
          <Button variant="contained" color="primary" onClick={handleViewClick}>
            View
          </Button>
        </>
      )}
    </Box>
  );
};

const PendingRequestList: React.FC = () => {
  const pendingRequests: any[] = [
    // Your pending request data
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        width: '25vw',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {pendingRequests.map((request, index) => (
        <PendingRequest
          key={index}
          title={request.title}
          date={request.date}
          requestType={request.requestType}
          status={request.status}
          requestId={request.requestId}
          requestName={request.requestName}
          quantity={request.quantity}
        />
      ))}
    </Box>
  );
};

export default PendingRequestList;
