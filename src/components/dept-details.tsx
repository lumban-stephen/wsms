import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import EditDeptModal from './editdept-modal';

interface RequestHistoryItemProps {
  requestType: string;
  date: string;
}

interface DeptDetailsProps {
  departmentName: string;
  contactDetails: string;
  email: string;
  requestHistory: RequestHistoryItemProps[];
  // Added userId prop to receive user ID from parent component
  userId?: string;
}

const RequestHistoryItem: React.FC<RequestHistoryItemProps> = ({ requestType, date }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="body1">{requestType}</Typography>
      <Typography variant="body2" color="text.secondary">
        {date}
      </Typography>
    </Box>
  );
};

const DeptDetails: React.FC<DeptDetailsProps> = ({
  departmentName,
  contactDetails,
  email,
  requestHistory,
  userId, // Use userId prop instead of decodedToken.user_id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Card style={{ width: '500px', flex: '1', overflowY: 'scroll', padding: '10px'}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {departmentName}
        </Typography>
        <Typography variant="body1">{contactDetails}</Typography>
        <Typography variant="body1">{email}</Typography>
        <Box mt={2} mb={1}>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Request History
          </Typography>
          {requestHistory.map((request, index) => (
            <RequestHistoryItem
              key={index}
              requestType={request.requestType}
              date={request.date}
            />
          ))}
        </Box>

        {/* Place the modal rendering logic here (after the request history): */}
        {isModalOpen && (
          <EditDeptModal
            open={isModalOpen}
            onClose={handleModalClose}
            initialDepartment={{
              id: userId || "undefined dept_id", // Use userId prop or fallback
              name: departmentName,
              admin: userId || "undefined username", // Replace with actual admin
              contact: contactDetails,
              email: email,
            }}
            onSubmit={(updatedDepartment) => {
              // Handle department update logic here (e.g., API call)
              console.log('Updated department:', updatedDepartment);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DeptDetails;

