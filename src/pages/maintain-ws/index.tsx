import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar';
import React, { useState, useEffect } from 'react';
import ApplicantList from '../../components/applicant-list';
import { Applicant } from '../../utils/interfaces';
import ApplicantModal from '../../components/applicant-modal';
import WsList from '../../components/ws-list';
import WsModal from '../../components/ws-modal';

const MaintainWS: React.FC = () => {
  const [scholars, setScholars] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScholar, setSelectedScholar] = useState<Applicant | null>(null);

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await fetch('http://localhost:3000/applicants/maintain-ws');
        if (!response.ok) {
          throw new Error('Failed to fetch applicants');
        }
        const data = await response.json();
        setScholars(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScholars();
  }, []);

  const handleViewScholar = (scholar: Applicant) => {
    setSelectedScholar(scholar);
  };

  const handleCloseModal = () => {
    setSelectedScholar(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(scholars);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      {/* Content Per Tab */}
      <Box sx={{ backgroundColor: 'white', height: '87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', minHeight: '73vh' }}>
          {/* Active Tab Content */}
          <>
            {/* Applicant List Component */}
            <WsList scholars={scholars} setScholars={setScholars} handleViewScholar={handleViewScholar} />
          </>
          {/* Applicant Modal */}
          {selectedScholar && (
            <WsModal
              isOpen={!!selectedScholar}
              onClose={handleCloseModal}
              workingScholar={selectedScholar}
              onWsUpdate={(updatedApplicant: Applicant) => {
                throw new Error('Function not implemented.');
              }}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MaintainWS;