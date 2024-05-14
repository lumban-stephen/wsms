import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import EditDeptModal from './editdept-modal';
import { User } from '../utils/interfaces';
import { jwtDecode } from 'jwt-decode';

interface RequestHistoryItemProps {
  requestType: string;
  date: string;
}

interface DeptDetailsProps {
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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<any>();
  const decodedToken = jwtDecode<User>(token);
  const { user_id, username, password, user_type, dept } = decodedToken;
  const [user, setUser] = useState<User>();
  setUser(decodedToken);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
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
              id: user?.username || "undefined dept_id",
              name: departmentName,
              admin: user?.username || "undefined username", // Replace with actual admin
              contact: contactDetails,
              email: user?.username || "undefined email",
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