import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { exp: number; user_type: string } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime && allowedRoles.includes(decodedToken.user_type)) {
          console.log(decodedToken.user_type);
          return true;
        }
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
    return false;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;