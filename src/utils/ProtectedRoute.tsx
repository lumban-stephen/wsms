import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
  userdetailFk?: number; // Optional property
  token?: string; // Optional property
}

const ProtectedRoute = ({
  allowedRoles,
  children,
  userdetailFk,
  token,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { exp: number; user_type: string } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime && allowedRoles.includes(decodedToken.user_type);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
    return false;
  };

  // Track both authentication and authorization state
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false); // Initial state
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check authentication on initial render and after token changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isAuth = isAuthenticated();
      setIsAuthenticatedState(isAuth);
      setIsAuthorized(isAuth); // Update authorization state based on authentication
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange); // Cleanup
  }, []); // Empty dependency array to run only once on mount

  // Handle unauthorized access differently on reload
  useEffect(() => {
    if (!isAuthenticatedState) {
      // Redirect to login on initial load if not authenticated
      navigate('/login', { replace: true });
    } else if (!isAuthorized) {
      // Display error or handle unauthorized access on reload
      console.error('Unauthorized access to protected route:', location.pathname); // Log unauthorized attempt
      // Optionally: Display an error message or redirect to a permission denied page
    }
  }, [isAuthenticatedState, isAuthorized, location]); // Re-run on state changes and location change

  if (!isAuthorized) {
    return <div>You are not authorized to access this page.</div>; // Or display an error message
  }

  return React.cloneElement(children as React.ReactElement, {
    userdetailFk,
    token,
  });
};

export default ProtectedRoute;
