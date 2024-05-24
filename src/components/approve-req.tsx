import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Stepper, Step, StepLabel, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignWS from './assignws';
import { WorkingScholar } from '../utils/interfaces';

interface Request {
  ws_req_id: number;
  ws_req_name: string;
  message: string;
  dept_name_fk: number;
  ws_req_stat: string;
  ws_req_type: string;
  quantity: number;
  date_created: string;
  approve_step?: number;
}

interface ApproveReqProps {
  onClose: () => void;
  requestDetails?: Request;
  open: boolean;
}

const steps = ['Submit Approval', 'HR Approval', 'CAD Approval', 'UC Main Approval', 'Clinic Approval'];
const colors = ['#ced4da', '#73869c', '#2c73e6', '#00b074', '#e74c3c']; // Define colors for each step

const ApproveReq: React.FC<ApproveReqProps> = ({ onClose, requestDetails, open }) => {
  const [activeStep, setActiveStep] = useState(requestDetails?.approve_step || 0);
  const [isAssignWSModalOpen, setIsAssignWSModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseScholars = await fetch('/api/ws/working-scholars/unassigned'); // Replace with your actual API endpoint
  //       const scholarData = await responseScholars.json();
  //       setWorkingScholars(scholarData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // Handle errors appropriately (e.g., display error message)
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    console.log("ws are " + workingScholars); // This will be logged after workingScholars is updated
  }, [workingScholars]);

  const handleApprove = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const response = await fetch('http://localhost:3000/ws/working-scholars/unassigned');
    
        if (!response.ok) {
          throw new Error('Failed to fetch unassigned working scholars');
        }
        
        const data = await response.json();
        setWorkingScholars(data);
        console.log("ws are " + workingScholars)
      } catch (error) {
        console.error('Error fetching unassigned working scholars:', error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
      setIsAssignWSModalOpen(true);
    } else {
      if (!requestDetails) {
        console.error('Request details are missing');
        return;
      }
  
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(`http://localhost:3000/requests/approve/${requestDetails.ws_req_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
          body: JSON.stringify({ approvedStep: activeStep + 1 }), // Send the next step
        });
  
        if (!response.ok) {
          const errorText = await response.text(); // Get response body as text
          console.log('Failed response:', response.status, errorText); // Log the response status and text
          throw new Error(`Failed to approve request: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json(); // Parse the response data (optional)
        console.log('Approval successful:', data); // Log the response data (optional)
  
        setIsLoading(false); // Set loading state to false after successful response
        handleNext(); // Call handleNext only after successful response
      } catch (error) {
        setIsLoading(false); // Set loading state to false after error
        console.error('Error approving request:', error); // Handle error appropriately, e.g., display an error message to the user
        alert(`An error occurred while approving the request: ${error}`);
      }
    }
  };
  

  const handleCloseAssignWSModal = () => {
    setIsAssignWSModalOpen(false);
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:3000/requests/rejectreq/${requestDetails?.ws_req_id}`, {
        method: 'POST',
      });

      console.log(response)
  
      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
  
      onClose(); // Close the ApproveReq modal
    } catch (error) {
      console.error('Error rejecting request:', error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Request ID: {requestDetails?.ws_req_id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Request Date: {requestDetails?.date_created}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Request Type: {requestDetails?.ws_req_type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Quantity: {requestDetails?.quantity}
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  style={{
                    color: activeStep >= index ? colors[index] : '#ced4da', // Set color based on activeStep
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="error" onClick={handleReject} sx={{ mr: 2 }}>
              Reject
            </Button>
            <Button variant="contained" color="primary" onClick={handleApprove}>
              {activeStep === steps.length - 1 ? 'Approve' : 'Approve Step'}
            </Button>
          </Box>
        </Box>
        {isLoading && <Skeleton variant="rectangular" width={400} height={100} />}
      <AssignWS
        open={isAssignWSModalOpen}
        onClose={handleCloseAssignWSModal}
        workingScholars={workingScholars}
        departmentId={requestDetails?.dept_name_fk}
      />
      </Box>
    </Modal>
  );
};

export default ApproveReq;
