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

type Department = {
  departmentId: string;
  imageUrl: string;
  departmentName: string;
  userType: string;
  contact: string;
  deptEmail: string;
};

type AddDepartmentModalProps = {
  open: boolean;
  onClose: () => void;
  onDepartmentAdded: (department: Department) => void; // Ensure this matches the global Department type
};

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ open, onClose, onDepartmentAdded }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [userType, setUserType] = useState('');
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [contact, setContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [departmentAdminUserId, setDepartmentAdminUserId] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDepartment = {
      departmentName,
      contact,
      deptEmail,
      userType,
    };

    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      if (response.ok) {
        const data: Department = await response.json();
        onDepartmentAdded(data);
      } else {
        console.error('Failed to add department');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form fields
    setDepartmentName('');
    setUserType('');
    setContact('');
    setDeptEmail('');
    onClose();
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



  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Department</DialogTitle>
      <form onSubmit={handleAdd}>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department Email"
            value={deptEmail}
            onChange={(e) => setDeptEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add Department
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDepartmentModal;
