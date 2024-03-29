// PendingRequestList.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface PendingRequestProps {
  title: string;
  date: string;
  requestType: string;
  status: string;
  requestId: string;
  quantity: number;
  onViewClick: (
    requestId: string,
    requestType: string,
    quantity: number
  ) => void;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  title,
  date,
  requestType,
  status,
  requestId,
  quantity,
  onViewClick,
}) => {
  const handleViewClick = () => {
    onViewClick(requestId, requestType, quantity);
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
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{date}</Typography>
        <Typography variant="body2">Request Type: {requestType}</Typography>
        <Typography variant="body2">Status: {status}</Typography>
      </div>
      <Button variant="contained" color="primary" onClick={handleViewClick}>
        View
      </Button>
    </Box>
  );
};

interface PendingRequestListProps {
  onViewClick: (
    requestId: string,
    requestType: string,
    quantity: number
  ) => void;
}

const PendingRequestList: React.FC<PendingRequestListProps> = ({ onViewClick }) => {
  const pendingRequests: any[] = [
    // Your pending request data
    {
      title: 'College of Computer Studies',
      date: 'Feb 12, 2024',
      requestType: 'Replacement',
      status: 'Pending for approval',
      requestId: 'REQ001',
      quantity: 10,
    },
    {
      title: 'College of Computer Studies',
      date: 'Mar 5, 2024',
      requestType: 'New Request',
      status: 'Under Review',
      requestId: 'REQ002',
      quantity: 5,
    },
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
          quantity={request.quantity}
          onViewClick={onViewClick}
        />
      ))}
    </Box>
  );
};

export default PendingRequestList;