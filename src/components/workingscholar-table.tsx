import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { WorkingScholar, Department } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

interface WorkingScholarTableProps {
  workingScholars: WorkingScholar[] | undefined;
  departmentId?: number;
  selectedScholar?: WorkingScholar | null; // Optional selected scholar for highlighting
  onConfirmAssignment?: () => void; // Optional confirmation function (if implemented)
  onCancelAssignment?: () => void; // Optional cancel function (if implemented)
  request?: number;
}

const WorkingScholarTable: React.FC<WorkingScholarTableProps> = ({
  workingScholars,
  departmentId,
  selectedScholar,
  onConfirmAssignment,
  onCancelAssignment,
  request,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedScholars, setSelectedScholars] = useState<number[]>([]); 
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, scholarId: number) => {
    const isChecked = event.target.checked;
    const updatedSelectedScholars = [...selectedScholars];

    if (isChecked) {
      updatedSelectedScholars.push(scholarId);
    } else {
      const index = updatedSelectedScholars.indexOf(scholarId);
      updatedSelectedScholars.splice(index, 1);
    }

    setSelectedScholars(updatedSelectedScholars);
  };

  const handleConfirmAssignment = async () => {
    if (!selectedScholars.length) {
      alert('Please select working scholars to assign.');
      return;
    }
  
    // Check if departmentId is defined before using it
    if (!departmentId) {
      console.error('Department ID is not available. Cannot assign scholars.');
      return; // Or display an error message to the user
    }
  
    const chosenDepartmentId = departmentId;// Replace with actual logic to get the chosen department
  
    try {
      // Call the function to assign scholars to department
      console.log(`Selected scholars (IDs: ${selectedScholars.join(', ')}) will be assigned to the department: ${chosenDepartmentId}`);
      await assignScholarsToDepartment(selectedScholars, chosenDepartmentId);
  
      // Reset selected scholars after successful assignment
      setSelectedScholars([]);
  
      // Call onConfirmAssignment if provided (optional)
      if (onConfirmAssignment) {
        onConfirmAssignment();
      }
  
      console.log('Scholars assigned successfully!');

      if (request) {
        await updateRequestStatus(request); // Call the update function
        console.log('Request status updated to approved.');
      } else {
        console.warn('Request ID not provided. Skipping request status update.');
      }
    } catch (error) {
      console.error('Error assigning scholars:', error);
      // Handle error message to the user (e.g., display an error toast)
    }
  };
  
  const assignScholarsToDepartment = async (scholarIds: number[], departmentId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/ws/assigndept`, {
        method: 'PUT',
        body: JSON.stringify({ departmentId, scholarIds }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Failed to assign scholars');
      }
  
      const data = await response.json();
      console.log('Assignment successful:', data); // Handle success message
    } catch (error) {
      console.error('Error assigning scholars:', error);
      // Handle error message to the user (e.g., display an error toast)
    }
  };

  const updateRequestStatus = async (requestId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/requests/updatestatus/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'approved' }), // Update status to "approved"
      });

      if (!response.ok) {
        throw new Error(`Failed to update request status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Optional: handle response data
      console.log('Request status updated:', data);
      navigate('/approver');
    } catch (error) {
      console.error('Error updating request status:', error);
      // Handle error message to the user (e.g., display an error alert)
    }
  };
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                color="primary"
                indeterminate={selectedScholars.length > 0 && selectedScholars.length !== workingScholars?.length}
                checked={selectedScholars.length === workingScholars?.length}
                onChange={() => {
                  if (selectedScholars.length === workingScholars?.length) {
                    setSelectedScholars([]);
                  } else {
                    const allScholarIds = workingScholars?.map((scholar) => scholar.id) || [];
                    setSelectedScholars(allScholarIds);
                  }
                }}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workingScholars?.map((scholar) => (
            <TableRow key={scholar.id} selected={scholar === selectedScholar}>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={selectedScholars.includes(scholar.id)}
                  onChange={(event) => handleCheckboxChange(event, scholar.id)}
                />
              </TableCell>
              <TableCell>{scholar.name}</TableCell>
              <TableCell>{scholar.gender}</TableCell>
              <TableCell>{scholar.course}</TableCell>
              <TableCell>{scholar.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedScholars.length > 0 ? (
        <Button variant="outlined" color="primary" onClick={handleConfirmAssignment}>
          Assign Selected Scholars
        </Button>
      ):(
        <Button variant="outlined" color="primary" disabled>
          Assign Selected Scholars
        </Button>
      )}
    </TableContainer>
  );
};

export default WorkingScholarTable;
