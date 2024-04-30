import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar';
import React, { useState, useEffect } from 'react';
import ApplicantList from '../../components/applicant-list';
import { Applicant } from '../../utils/interfaces';
import ApplicantModal from '../../components/applicant-modal';

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
          console.error(error);
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
    setSelectedApplicant(applicant); // Set selected applicant
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null); // Clear selected applicant
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(applicants)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      {/* Content Per Tab */}
      <Box sx={{ backgroundColor: 'white', height: '87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', minHeight: '73vh' }}>
          {/* Active Tab Content */}
          <>
            {/* Applicant List Component */}
            <ApplicantList applicants={applicants} handleViewApplicant={handleViewApplicant} />
          </>
          {/* Applicant Modal */}
          {selectedApplicant && (
            <ApplicantModal isOpen={!!selectedApplicant} // Ensure truthy value for isOpen
              onClose={handleCloseModal}
              applicant={selectedApplicant}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MaintainApplicants;
