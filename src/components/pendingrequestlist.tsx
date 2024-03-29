import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface PendingRequestProps {
  title: string;
  date: string;
  requestType: string;
  status: string;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  title,
  date,
  requestType,
  status,
}) => {
  return (
    <Box
      sx={{
        border: '1px solid gray',
        borderRadius: 1,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2, // Add margin bottom for spacing
      }}
    >
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{date}</Typography>
        <Typography variant="body2">
          Request Type: {requestType}
        </Typography>
        <Typography variant="body2">Status: {status}</Typography>
      </div>
      <Button variant="contained" color="primary">
        View
      </Button>
    </Box>
  );
};

const PendingRequestList: React.FC = () => {
  const pendingRequests = [
    {
      title: 'College of Computer Studies',
      date: 'Feb 12, 2024',
      requestType: 'Replacement',
      status: 'Pending for approval',
    },
    {
      title: 'School of Engineering',
      date: 'Mar 5, 2024',
      requestType: 'New Request',
      status: 'Under Review',
    },
    // Add more pending requests as needed
  ];

  return (
    <Box
      sx={{
        maxHeight: 400, // Set a maximum height for the list
        overflow: 'auto', // Enable scrolling when content exceeds max height
      }}
    >
      {pendingRequests.map((request, index) => (
        <PendingRequest
          key={index}
          title={request.title}
          date={request.date}
          requestType={request.requestType}
          status={request.status}
        />
      ))}
    </Box>
  );
};

export default PendingRequestList;