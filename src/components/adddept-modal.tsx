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

interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
}

const AddDepartmentModal = ({ open, onClose }: AddDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentAdmin, setDepartmentAdmin] = useState('');
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [deptContact, setDeptContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');

  useEffect(() => {
    const fetchDeptAdmins = async () => {
      try {
        const response = await fetch('/api/dept-admins');
        if (response.ok) {
          const usernames = await response.json();
          setDeptAdmins(usernames);
        } else {
          console.error('Failed to fetch department admins');
        }
      } catch (error) {
        console.error('Error fetching department admins:', error);
      }
    };

    fetchDeptAdmins();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      departmentName,
      departmentAdmin,
      deptContact,
      deptEmail,
    });
    // Reset form fields or close the modal
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
              <MenuItem value="">Select Department Admin</MenuItem>
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