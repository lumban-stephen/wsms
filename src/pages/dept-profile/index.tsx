import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DeptDetails from '../../components/dept-details';
import WsCard from '../../components/ws-card'; // Import WsCard component
import WsCardModal from '../../components/wscard-modal'; // Import WsCardModal component
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters

interface DepartmentDetails {
  name: string;
  description: string;
  contactDetails: string;
  email: string;
}

interface DeptRequest {
  requestType: string;
  date: string;
}

interface WorkingScholar {
  name: string;
  department: string;
  address: string;
  lastSchoolAttended: string;
  facebookAccount: string;
  contactNo: string;
  guardianName: string;
  guardianContact: string;
  contractStart: string;
  contractEnd: string;
}

const DeptProfile = () => {
  const [departmentDetails, setDepartmentDetails] = useState<DepartmentDetails | null>(null);
  const [departmentRequests, setDepartmentRequests] = useState<DeptRequest[]>([]);
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>([]);
  const { departmentId } = useParams(); // Get department ID from URL parameter

  const [wsCardModalOpen, setWsCardModalOpen] = useState(false);
  const [selectedWsData, setSelectedWsData] = useState<WorkingScholar | null>(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!departmentId) return; // Handle missing department ID

      const departmentDetailsResponse = await fetch(`/api/departments/${departmentId}`);
      const departmentRequestsResponse = await fetch(`/api/departments/${departmentId}/requests`);
      const workingScholarsResponse = await fetch(`/api/departments/${departmentId}/working-scholars`);

      if (!departmentDetailsResponse.ok || !departmentRequestsResponse.ok || !workingScholarsResponse.ok) {
        console.error('Error fetching department data');
        // Handle errors appropriately (e.g., display an error message)
        return;
      }

      const departmentDetailsData = await departmentDetailsResponse.json();
      const departmentRequestsData = await departmentRequestsResponse.json();
      const workingScholarsData = await workingScholarsResponse.json();

      setDepartmentDetails(departmentDetailsData);
      setDepartmentRequests(departmentRequestsData);
      setWorkingScholars(workingScholarsData);
    };

    fetchDepartmentData();
  }, [departmentId]);

  const handleWsCardClick = (scholarData: WorkingScholar) => {
    setSelectedWsData(scholarData);
    setWsCardModalOpen(true);
  };

  const handleModalClose = () => {
    setWsCardModalOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {departmentDetails ? (
        <>
          <Grid item xs={12} md={3}>
            <DeptDetails
              departmentName={departmentDetails.name}
              contactDetails={departmentDetails.contactDetails}
              email={departmentDetails.email}
              // Replace with actual request history data from departmentDetails
              requestHistory={[]} // Placeholder for actual data
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>
              <Typography variant="h4" mb={2}>
                {departmentDetails.name}
              </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                {workingScholars.map((card, index) => (
                  <Box key={index} m={1}>
                    <WsCard
                      name={card.name}
                      department={departmentDetails.name}
                      onClick={() => handleWsCardClick(card)} // Pass scholar data on click
                      style={{ backgroundColor: 'blue', padding: '16px' }} // Set blue background and padding
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          {wsCardModalOpen && selectedWsData && (
            <WsCardModal
              open={wsCardModalOpen}
              onClose={handleModalClose}
              wsData={selectedWsData} // Pass selected scholar data to modal
            />
          )}
        </>
      ) : (
        <Typography variant="body1">Loading department details...</Typography>
      )}
    </Grid>
  );
}

export default DeptProfile;
