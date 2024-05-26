import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DeptDetails from '../../components/dept-details';
import WsCard from '../../components/ws-card';
import WsCardModal from '../../components/wscard-modal';
import { useParams } from 'react-router-dom';
import NavBarStaff from '../../components/navbar-staff';
import defaultImage from '../../assets/default-dp.png'; 

interface DepartmentDetails {
  department_name: string;
  contact: string;
  dept_email: string;
}

interface WorkingScholar {
  applicant_fk: number;
  name: string;
  department: string;
  address: string;
  lastSchoolAttended: string;
  facebookAccount: string;
  contactNo: string;
}

const StaffProfile = () => {
  const [departmentDetails, setDepartmentDetails] = useState<DepartmentDetails | null>(null);
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>([]);
  const { departmentId } = useParams(); // Get department ID from URL parameter

  const [wsCardModalOpen, setWsCardModalOpen] = useState(false);
  const [selectedWsData, setSelectedWsData] = useState<WorkingScholar | null>(null);

  const fetchDeptDetailData = async () => {
    // Fetch department details
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
    // Fetch working scholars data
    try {
      const response = await fetch(`http://localhost:3000/departments/dept-profile/${departmentId}/working-scholars`);
      if (!response.ok) {
        console.error('Error fetching working scholars:', response);
        return;
      }
      const data = await response.json();
      console.log(data);
      setWorkingScholars(data);
    } catch (error) {
      console.error('Error fetching working scholars:', error);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchDeptDetailData();
      fetchWsData();
    }
  }, [departmentId]);

  useEffect(() => {
    // Open modal when selectedWsData is not null
    if (selectedWsData) {
      setWsCardModalOpen(true);
    }
  }, [selectedWsData]);

  const handleWsCardClick = (scholarData: WorkingScholar) => {
    setSelectedWsData(scholarData);
    console.log(selectedWsData?.applicant_fk);
  };

  const handleModalClose = () => {
    setWsCardModalOpen(false);
  };

  return (
    <>
      <NavBarStaff activeTab={'WorkingScholars'} />
      <Grid container spacing={2}>
        {departmentDetails ? (
          <>
            <Grid item xs={12} md={3}>
              <Box style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                <DeptDetails
                  departmentName={departmentDetails.department_name}
                  contactDetails={departmentDetails.contact}
                  email={departmentDetails.dept_email}
                  requestHistory={[]} 
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
                        imageUrl={defaultImage}
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
}

export default StaffProfile;
