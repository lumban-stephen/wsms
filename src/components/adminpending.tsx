import React, { useState } from 'react';
import ApproveReq from './approve-req';
import { Box, Button, Typography } from '@mui/material';

interface Request {
  ws_req_id: number;
  ws_req_name: string;
  message: string;
  dept_name_fk: string;
  ws_req_stat: string;
  ws_req_type: string;
  quantity: number;
  date_created: string;
  approve_step?: number;
}


interface PendingRequestProps {
  request: Request; // Update prop type
  onViewClick: ( request: Request  ) => void;
}

const PendingRequestAdmin: React.FC<PendingRequestProps> = ({
  request,
  onViewClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    onViewClick(request);
    setIsModalOpen(true); // Open modal
    console.log(request.quantity)
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
        <Typography variant="body2">Status: {request.ws_req_stat}</Typography>
      </div>
      <Button variant="contained" color="primary" onClick={handleViewClick}>
        View
      </Button>
      {isModalOpen && (
        <ApproveReq
          onClose={() => setIsModalOpen(false)} // Close modal on prop function call
          requestDetails={request} // Pass request data as a prop to Modal
          open={isModalOpen}
        />
      )}
    </Box>
  );
};

interface AdminPendingListProps {
  requests: Request[];
  onViewClick: ( request: Request  ) => void;
}

const AdminPending: React.FC<AdminPendingListProps> = ({
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
        <PendingRequestAdmin
          key={index}
          request={request} // Pass the entire request object as prop
          onViewClick={onViewClick}
        />
      ))}
    </Box>
  );
};

export default AdminPending;
