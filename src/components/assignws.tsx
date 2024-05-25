import React from 'react'; // Import only what's used
import { Modal, Box, Typography, Button } from '@mui/material';
import WorkingScholarTable from './workingscholar-table';
import { WorkingScholar, Department } from '../utils/interfaces';

interface AssignWSProps {
  open: boolean;
  onClose: () => void;
  workingScholars?: WorkingScholar[]; // Optional workingScholars prop
  departmentId?: number;
  requestId?: number;
}

const AssignWS: React.FC<AssignWSProps> = ({ open, onClose, workingScholars, departmentId, requestId }) => {


const handleAssignDepartment = async (selectedScholarIds: number[], departmentId: number) => {  
    try {
      const response = await fetch(`http://localhost:3000/ws/assigndept}`, {
        method: 'PUT',
        body: JSON.stringify({ departmentId, scholarIds: selectedScholarIds }), // Send department ID in request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to assign working scholar to department');
      }
  
      console.log('Scholar assigned successfully!');
      // You might want to close the modal or update the UI after successful assignment
  
    } catch (error) {
      console.error('Error assigning working scholar:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Assign Working Scholar to Department
          </Typography>
          {workingScholars ? (
            workingScholars.length > 0 ? (
              <WorkingScholarTable
                workingScholars={workingScholars}
                departmentId={departmentId} // Pass the departments data here
                request={requestId}
              />
            ) : (
              <Typography variant="body2">No working scholars available.</Typography>
            )
          ) : (
            <Typography variant="body2">Loading working scholars...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AssignWS;
