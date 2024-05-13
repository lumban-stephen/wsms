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
    id: number; // Department ID
    name: string;
    admin: string;
    contact: string;
    email: string;
  };
  onSubmit: (updatedDepartment: { id: number; name: string; admin: string; contact: string; email: string }) => void; // Function to handle form submission
}

const EditDeptModal = ({ open, onClose, initialDepartment, onSubmit }: EditDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState(initialDepartment.name);
  const [departmentAdmin, setDepartmentAdmin] = useState(initialDepartment.admin);
  const [deptAdmins, setDeptAdmins] = useState<string[]>([]);
  const [deptContact, setDeptContact] = useState(initialDepartment.contact);
  const [deptEmail, setDeptEmail] = useState(initialDepartment.email);

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
    const updatedDepartment = {
      id: initialDepartment.id, // Use the original ID for update
      name: departmentName,
      admin: departmentAdmin,
      contact: deptContact,
      email: deptEmail,
    };
    onSubmit(updatedDepartment); // Call the provided onSubmit function
    // Reset form fields or close the modal (optional)
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
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDeptModal;
