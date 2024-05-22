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

interface EditDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  // Add props for initial department data
  initialDepartment: {
    id: number | 0; // Department ID pls change to number when fixing this
    name: string;
    contact: string;
    email: string;
  };
  onSubmit: (updatedDepartment: { id: number; name: string; contact: string; email: string }) => void; // Function to handle form submission
}

const EditDeptModal = ({ open, onClose, initialDepartment, onSubmit }: EditDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState(initialDepartment.name);
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [deptContact, setDeptContact] = useState(initialDepartment.contact);
  const [deptEmail, setDeptEmail] = useState(initialDepartment.email);

  useEffect(() => {
    const fetchDeptAdmins = async () => {
      try {
        const response = await fetch('http://localhost:3000/deptadmin/fetchstaff');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const updatedDepartment = {
      id: initialDepartment.id,
      name: departmentName,
      contact: deptContact,
      email: deptEmail,
    };
  
    try {
      const response = await fetch('http://localhost:3000/deptadmin/updatedept', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDepartment),
      });
    
      if (response.ok) {
        // Handle successful update
        console.log('Department updated successfully');
        onSubmit(updatedDepartment);
        onClose();
      } else {
        const errorData = await response.json(); // Try parsing error data from response
        console.error('Failed to update department:', response.statusText);
        console.error('Error details:', errorData); // Log any error details from backend
      }
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
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
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDeptModal;
