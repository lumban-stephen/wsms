import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import EditDeptModal from './editdept-modal';

interface RequestHistoryItemProps {
  requestType: string;
  date: string;
}

interface DeptDetailsProps {
  departmentId?:number;
  departmentName: string;
  contactDetails: string;
  email: string;
  requestHistory: RequestHistoryItemProps[];
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
  departmentId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temp, setTemp] = useState('');
  const [deptId, setDepartmentId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setTemp(departmentName);
    setIsModalOpen(true);
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
        {isModalOpen && departmentId && (
          <EditDeptModal
            open={isModalOpen}
            onClose={handleModalClose}
            initialDepartment={{
              id: departmentId,
              name: departmentName,
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

