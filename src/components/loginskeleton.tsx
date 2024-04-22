import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoginSkeleton = () => {
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 }}>  {/* Adjust opacity as needed */}
      <Skeleton variant="rectangular" width={200} height={50} />
    </div>
  );
};

export default LoginSkeleton;
