import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        return true;
      }
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  return false;
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;