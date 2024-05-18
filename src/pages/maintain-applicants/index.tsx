import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar';
import React, { useState, useEffect } from 'react';
import ApplicantList from '../../components/applicant-list';
import { Applicant } from '../../utils/interfaces';
import ApplicantModal from '../../components/applicant-modal';
import NavBarAdmin from '../../components/navbar-admin';

const MaintainApplicants: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://localhost:3000/applicants/maintain-applicants');
        if (!response.ok) {
          throw new Error('Failed to fetch applicants');
        }
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const handleViewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(applicants);

  return (
    <>
    <NavBarAdmin activeTab={'Applicants'}/>
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      {/* Content Per Tab */}
      <Box sx={{ backgroundColor: 'white', height: '87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', minHeight: '73vh' }}>
          {/* Active Tab Content */}
          <>
            {/* Applicant List Component */}
            <ApplicantList applicants={applicants} setApplicants={setApplicants} handleViewApplicant={handleViewApplicant} />
          </>
          {/* Applicant Modal */}
          {selectedApplicant && (
            <ApplicantModal
              isOpen={!!selectedApplicant}
              onClose={handleCloseModal}
              applicant={selectedApplicant}
              onApplicantUpdate={(updatedApplicant: Applicant) => {
                throw new Error('Function not implemented.');
              }}
            />
          )}
        </Paper>
      </Box>
    </Box>
    </>
  );
};

export default MaintainApplicants;