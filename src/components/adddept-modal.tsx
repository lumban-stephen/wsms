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
} from '@mui/material';

interface Department {
  imageUrl: string;
  departmentName: string;
  departmentAdmin: string;  // Added departmentAdmin property
  deptContact: string;  // Added deptContact property
  deptEmail: string;  // Added deptEmail property
}

interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onDepartmentAdded: (department: Department) => void;  // Adjust to include new properties
}

const AddDepartmentModal = ({ open, onClose, onDepartmentAdded }: AddDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentAdmin, setDepartmentAdmin] = useState('');
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [deptContact, setDeptContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = () => {
    const newDepartment: Department = {
      imageUrl,
      departmentName,
      departmentAdmin,
      deptContact,
      deptEmail,
    };
    onDepartmentAdded(newDepartment);
  };

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
  
    const newDepartment: Department = {
      imageUrl: 'path/to/default/image.jpg', // Use a default image path or allow user to upload
      departmentName,
      departmentAdmin,
      deptContact,
      deptEmail,
    };
    
    // Call the onDepartmentAdded prop to pass the new department back to the parent component
    onDepartmentAdded(newDepartment);

    // Reset form fields
    setDepartmentName('');
    setDepartmentAdmin('');
    setDeptContact('');
    setDeptEmail('');
    onClose();
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
          <Button onClick={handleAdd}>Add Dept</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDepartmentModal;
