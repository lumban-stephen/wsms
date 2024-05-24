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

interface WorkingScholarTableProps {
  workingScholars: WorkingScholar[] | undefined;
  departmentId?: number;
  onAssignDepartment: (scholarIds: number[], departmentId: number) => void;
  selectedScholar?: WorkingScholar | null; // Optional selected scholar for highlighting
  onConfirmAssignment?: () => void; // Optional confirmation function (if implemented)
  onCancelAssignment?: () => void; // Optional cancel function (if implemented)
}

const WorkingScholarTable: React.FC<WorkingScholarTableProps> = ({
  workingScholars,
  departmentId,
  onAssignDepartment,
  selectedScholar,
  onConfirmAssignment,
  onCancelAssignment,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedScholars, setSelectedScholars] = useState<number[]>([]); 

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAssignDepartment = (scholarIds: number[], departmentId: number) => {
    onAssignDepartment(scholarIds, departmentId);
    handleClose();
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
  
    // Get the chosen department ID (replace with actual logic)
    const chosenDepartmentId = 1; // Replace with actual logic to get the chosen department
  
    try {
      // Call the function to assign scholars to department
      await assignScholarsToDepartment(selectedScholars, chosenDepartmentId);
  
      // Reset selected scholars after successful assignment
      setSelectedScholars([]);
  
      // Call onConfirmAssignment if provided (optional)
      if (onConfirmAssignment) {
        onConfirmAssignment();
      }
  
      console.log('Scholars assigned successfully!');
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
      {onConfirmAssignment && (
        <Button variant="contained" color="primary" onClick={handleConfirmAssignment}>
          Assign Selected Scholars
        </Button>
      )}
    </TableContainer>
  );
};

export default WorkingScholarTable;
