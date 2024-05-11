import React, { useState, useEffect } from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface Department {
  imageUrl: string;
  departmentName: string;
}

const DeptDashboard = () => {
  const [departments, setDepartments] = useState<Department[]>([]); // State for department data
  const [selectedDept, setSelectedDept] = useState<Department | null>(null); // State for selected department
  const navigate = useNavigate(); // Hook for navigation

  // Fetch department data (replace with your actual API call)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments'); // Replace with your API endpoint
        const data = await response.json();
        if (response.ok) {
          setDepartments(data);
        } else {
          console.error('Error fetching departments:', data);
          // Handle errors appropriately (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    fetchDepartments();
  }, []);

  const handleDeptClick = (department: Department) => {
    setSelectedDept(department);
    navigate(`/dept-profile/${department.departmentName}`); // Navigate to dept-profile page with department name
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
          {departments.map((department, index) => (
            <Box key={index} m={1}>
              <Link
                component="button"
                underline="none" // Remove link underline for a button-like appearance
                onClick={() => handleDeptClick(department)}
              >
                <DeptCard imageUrl={department.imageUrl} departmentName={department.departmentName} />
              </Link>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" flexDirection="column">
          {selectedDept ? (
            <Typography variant="h6" gutterBottom>
              Selected Department: {selectedDept.departmentName}
            </Typography>
          ) : (
            <Typography variant="body1">Please select a department.</Typography>
          )}
          {/* Add your DeptReqCard logic or other content here */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeptDashboard;