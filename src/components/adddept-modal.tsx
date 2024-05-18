import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
} from '@mui/material';


interface Department {
  imageUrl: string;
  departmentName: string;
}

interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onDepartmentAdded: (addedDepartment: Department) => void; // Add this line
}

const AddDepartmentModal = ({ open, onClose, onDepartmentAdded }: AddDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentAdmin, setDepartmentAdmin] = useState('');
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [deptContact, setDeptContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user-role');
        if (response.ok) {
          const role = await response.text();
          setUserRole(role);
        } else {
          console.error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentName,
          departmentAdmin,
          deptContact,
          deptEmail,
        }),
      });

      const formData = {
        departmentName,
        departmentAdmin,
        deptContact,
        deptEmail,
      };
      console.log('Form data:', formData);
  
      if (response.ok) {
        const createdDepartment = await response.json();
        console.log('Created department:', createdDepartment);
        onDepartmentAdded(createdDepartment); // Call the onDepartmentAdded prop with the created department
      } else {
        console.error('Failed to create department:', await response.text());
      }
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };


  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Department</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-admin-label">Department Admin</InputLabel>
            <Select
              labelId="department-admin-label"
              value={departmentAdmin}
              onChange={(e) => setDepartmentAdmin(e.target.value)}
            >
              
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              {(userRole === 'Admin' || userRole === 'Staff') && [
                <MenuItem key="admin" value="Admin">
                  Admin
                </MenuItem>,
                <MenuItem key="staff" value="Staff">
                  Staff
                </MenuItem>,
              ]}
              {deptAdmins.map((username) => (
                <MenuItem key={username} value={username}>
                  {username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Dept. Contact #"
            value={deptContact}
            onChange={(e) => setDeptContact(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dept. Email"
            value={deptEmail}
            onChange={(e) => setDeptEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Add Dept
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDepartmentModal;