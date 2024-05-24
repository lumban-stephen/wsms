import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WorkingScholarTable from './workingscholar-table';
import { WorkingScholar, Department } from '../utils/interfaces';

interface AssignWSProps {
  open: boolean;
  onClose: () => void;
}

const AssignWS: React.FC<AssignWSProps> = ({ open, onClose }) => {
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[] | undefined>([]);
  const [departments, setDepartments] = useState<Department[] | undefined>([]);

  // Dummy data for demonstration purposes
  const dummyWorkingScholars: WorkingScholar[] = [
    { id: 1, name: 'John Doe', gender: 'Male', course: 'Computer Science', age: 22, applicantFk: 1, dept_fk: 2 },
    { id: 2, name: 'Jane Smith', gender: 'Female', course: 'Business Administration', age: 21, dept_fk: 2, applicantFk: 1 },
    // Add more dummy working scholars as needed
  ];

  const dummyDepartments: Department[] = [
    { id: 1, name: 'IT Department' },
    { id: 2, name: 'Finance Department' },
    // Add more dummy departments as needed
  ];

  const handleAssignDepartment = (scholarId: number, departmentId: number) => {
    // Implement the logic to assign a department to a working scholar
    console.log('Assigning department:', departmentId, 'to scholar:', scholarId);
  };

  const handleOpenModal = () => {
    setWorkingScholars(dummyWorkingScholars);
    setDepartments(dummyDepartments);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Assign Working Scholar to Department
          </Typography>
          <WorkingScholarTable
            workingScholars={workingScholars}
            departments={departments}
            onAssignDepartment={handleAssignDepartment}
          />
        <Button>
            Assign to dept
        </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AssignWS;