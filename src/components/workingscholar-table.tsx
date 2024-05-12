// WorkingScholarTable.tsx
import React from 'react';
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
} from '@mui/material';
import { WorkingScholar, Department } from '../utils/interfaces';

interface WorkingScholarTableProps {
  workingScholars: WorkingScholar[];
  departments: Department[];
  onAssignDepartment: (scholarId: number, departmentId: number) => void;
}

const WorkingScholarTable: React.FC<WorkingScholarTableProps> = ({
  workingScholars,
  departments,
  onAssignDepartment,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAssignDepartment = (scholarId: number, departmentId: number) => {
    onAssignDepartment(scholarId, departmentId);
    handleClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workingScholars.map((scholar) => (
            <TableRow key={scholar.id}>
              <TableCell>{scholar.name}</TableCell>
              <TableCell>{scholar.gender}</TableCell>
              <TableCell>{scholar.course}</TableCell>
              <TableCell>{scholar.age}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Assign to Dept
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {departments.map((department) => (
                    <MenuItem
                      key={department.id}
                      onClick={() =>
                        handleAssignDepartment(scholar.id, department.id)
                      }
                    >
                      {department.name}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkingScholarTable;