import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';

interface DeptCardProps {
  imageUrl: string;
  departmentName: string;
  userType: string;
  deptContact: string;
  deptEmail: string;
}

const DeptCard: React.FC<DeptCardProps> = ({
  imageUrl,
  departmentName,
  userType,
  deptContact,
  deptEmail
}: DeptCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={imageUrl} alt={departmentName} />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div" color="secondary">
              {departmentName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeptCard;
