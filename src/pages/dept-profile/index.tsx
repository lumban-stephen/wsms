import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DeptDetails from '../../components/dept-details';
import WsCard from '../../components/ws-card'; // Import WsCard component
import WsCardModal from '../../components/wscard-modal'; // Import WsCardModal component
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters
import NavBarAdmin from '../../components/navbar-admin';
import defaultImage from '../../assets/default-dp.png';

interface DepartmentDetails {
  department_name: string;
  contact: string;
  dept_email: string;
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
  imageUrl?: string; // Optional image URL
}

const DeptProfile = () => {
  const [departmentDetails, setDepartmentDetails] = useState<DepartmentDetails | null>(null);
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>([]);
  const { departmentId } = useParams<string>(); // Get department ID from URL parameter
  const [wsCardModalOpen, setWsCardModalOpen] = useState(false);
  const [selectedWsData, setSelectedWsData] = useState<WorkingScholar | null>(null);

  useEffect(() => {
    if (departmentId) {
      fetchDeptDetailData();
      fetchWsData();
    }
  }, [departmentId]);

  const fetchDeptDetailData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/departments/departments/${departmentId}`);
      if (!response.ok) {
        console.error('Error fetching department details:', response);
        return;
      }
      const data = await response.json();
      setDepartmentDetails(data);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const fetchWsData = async () => {
    if (!departmentId){
      console.log("No departmentId found.");
    }else{
      console.log(departmentId);
    }
  
    try {
      const workingScholarsResponse = await fetch(`http://localhost:3000/departments/dept-profile/${departmentId}/working-scholars`);
  
      if (!workingScholarsResponse.ok) {
        console.error('Error fetching working scholars' + workingScholarsResponse);
        // Handle errors appropriately (e.g., display an error message)
        return;
      }
  
      const workingScholarsData = await workingScholarsResponse.json();
      setWorkingScholars(workingScholarsData);
      console.log(workingScholarsData); // For debugging purposes (optional)
    } catch (error) {
      console.error('Error fetching department data:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  const handleWsCardClick = (scholarData: WorkingScholar) => {
    setSelectedWsData(scholarData);
    setWsCardModalOpen(true);
  };

  const handleModalClose = () => {
    setWsCardModalOpen(false);
  };

  return (
    <>
      <NavBarAdmin activeTab="WorkingScholars" />
      <Grid container spacing={2}>
        {departmentDetails ? (
          <>
            <Grid item xs={12} md={3}>
              <Box style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                <DeptDetails
                  departmentId={Number(departmentId)}
                  departmentName={departmentDetails.department_name}
                  contactDetails={departmentDetails.contact}
                  email={departmentDetails.dept_email}
                  requestHistory={[]} // Placeholder for actual data
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box>
                <Typography variant="h4" mb={2}>
                  {departmentDetails.department_name}
                </Typography>
                <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                  {workingScholars.map((card, index) => (
                    <Box key={index} m={1}>
                      <WsCard
                        imageUrl={card.imageUrl || defaultImage} // Use card.imageUrl if available, otherwise defaultImage
                        name={card.name}
                        department={departmentDetails.department_name}
                        onClick={() => handleWsCardClick(card)}
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
                wsData={selectedWsData}
              />
            )}
          </>
        ) : (
          <Typography variant="body1">Loading department details...</Typography>
        )}
      </Grid>
    </>
  );
};

export default DeptProfile;
