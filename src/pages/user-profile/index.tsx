import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useParams } from "react-router-dom";

interface ApplicantData {
  name: string;
  school_name: string;
  address: string;
  course: string;
  age: number;
  year: number;
  contact: string;
  status: string;
  gender: string;
}

const UserProfile: React.FC<{ userdetailFk: number; token: string }> = ({ userdetailFk, token }) => {
  const [applicant, setApplicant] = useState<ApplicantData | null>(null);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        // First, fetch the working_scholars record
        const workingScholarsResponse = await fetch(`/api/working_scholars/${userdetailFk}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const workingScholarsData = await workingScholarsResponse.json();
        const applicantFk = workingScholarsData.applicant_fk;

        // Then, fetch the applicant data using the applicant_fk
        const applicantResponse = await fetch(`/api/applicants/${applicantFk}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const applicantData = await applicantResponse.json();
        setApplicant(applicantData);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    };

    fetchApplicantData();
  }, [userdetailFk, token]);

  return (
    <Box display="flex" alignItems="center" mb={2}>
      {applicant ? (
        <>
          <Avatar>{applicant.name.charAt(0)}</Avatar>
          <Box ml={2}>
            <Typography variant="h6">{applicant.name}</Typography>
            <Typography variant="body2">School: {applicant.school_name}</Typography>
            <Typography variant="body2">Address: {applicant.address}</Typography>
            <Typography variant="body2">Course: {applicant.course}</Typography>
            <Typography variant="body2">Age: {applicant.age}</Typography>
            <Typography variant="body2">Year: {applicant.year}</Typography>
            <Typography variant="body2">Contact: {applicant.contact}</Typography>
            <Typography variant="body2">Status: {applicant.status}</Typography>
            <Typography variant="body2">Gender: {applicant.gender}</Typography>
          </Box>
        </>
      ) : (
        <Typography variant="body2">Applicant data empty</Typography>
      )}
    </Box>
  );
};

export default UserProfile;