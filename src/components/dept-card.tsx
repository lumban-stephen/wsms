import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Link } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

interface DeptCardProps {
  imageUrl: string;
  departmentName: string;
  userType: string;
  deptContact: string;
  deptEmail: string;
  departmentId: number; // Add departmentId prop
  workingScholarsUrl?: string; // Optional URL for working scholars (if available)
}

const DeptCard: React.FC<DeptCardProps> = ({
  imageUrl,
  departmentName,
  userType,
  deptContact,
  deptEmail,
  departmentId,
  workingScholarsUrl, // Optional URL for working scholars (if available)
}: DeptCardProps) => {
  const navigate = useNavigate(); // Call useNavigate inside the component

  const handleDeptClick = () => {
    navigate(`/dept-profile/${departmentId}`); // Use navigate inside the function
  };

  return (
    <Card onClick={handleDeptClick}> {/* Use onClick prop or default to handleDeptClick */}
      <CardMedia component="img" height="140" image={imageUrl} alt={departmentName} />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div" color="secondary">
              {departmentName}
            </Typography>
            {workingScholarsUrl && ( // Conditionally render link if URL is provided
              <Link underline="none" href={`${workingScholarsUrl}/${departmentId}`}>
                <Typography variant="body2" color="primary">
                  View Working Scholars
                </Typography>
              </Link>
            )}
          </Grid>
          {/* Add additional Grid items for other content here */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeptCard;

