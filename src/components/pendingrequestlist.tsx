import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Request {
  ws_req_id: string;
  ws_req_name: string;
  message: string;
  dept_name_fk: string;
  ws_req_stat: string; // Status property
  ws_req_type: string;
  quantity: number;
  date_created: string;
  approve_step: number;
}

interface PendingRequestProps {
  request: Request; // Update prop type
  onViewClick: (
    ws_req_id: string,
    ws_req_name: string,
    message: string,
    dept_name_fk: string, // typo fix
    ws_req_stat: string,
    ws_req_type: string,
    quantity: number,
    date_created: string,
    approve_step: number
  ) => void;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  request,
  onViewClick,
}) => {
  const handleViewClick = () => {
    onViewClick(request.ws_req_id, request.ws_req_name, request.message, request.dept_name_fk, request.ws_req_stat, request.ws_req_type, request.quantity, request.date_created, request.approve_step);
  };

  const getStatusColor = () => {
    switch (request.ws_req_stat.toLowerCase()) {
      case 'rejected':
      case 'cancelled':
        return 'error.main'; // Red color from Material UI theme
      case 'approved':
        return 'success.main'; // Green color from Material UI theme
      case 'waiting':
        return 'warning.main'; // Yellow color from Material UI theme
      default:
        return 'text.secondary'; // Default gray color
    }
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
        <Typography variant="h6">{request.ws_req_name}</Typography>
        <Typography variant="body2">{request.date_created}</Typography>
        <Typography variant="body2">Request Type: {request.ws_req_type}</Typography>
        <Typography variant="body2" color={getStatusColor()}>
          Status: {request.ws_req_stat}
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={handleViewClick}>
        View
      </Button>
    </Box>
  );
};

interface PendingRequestListProps {
  requests: Request[];
  onViewClick: (
    ws_req_id: string,
    ws_req_name: string,
    message: string,
    dept_name_fk: string,
    ws_req_stat: string,
    ws_req_type: string,
    quantity: number,
    date_created: string,
    approve_step: number
  ) => void;
}

const PendingRequestList: React.FC<PendingRequestListProps> = ({
  requests,
  onViewClick,
}) => {
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
      {requests.map((request, index) => (
        <PendingRequest
          key={index}
          request={request} // Pass the entire request object as prop
          onViewClick={onViewClick}
        />
      ))}
    </Box>
  );
};

export default PendingRequestList;
