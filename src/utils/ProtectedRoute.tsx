import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { User, UserType } from './interfaces';

interface ProtectedRouteProps {
  allowedRoles: UserType[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = (): boolean => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<User>(storedToken);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp ? decodedToken.exp > currentTime : false;
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
    return false;
  };

  // State variable to track authentication status
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const isUserAuthenticated = isAuthenticated();
    setIsAuthenticatedState(isUserAuthenticated);

    // Listen for changes in local storage
    const handleStorageChange = () => {
      const isAuth = isAuthenticated();
      setIsAuthenticatedState(isAuth);
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAuthorized = (): boolean => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<User>(storedToken);
        return allowedRoles.includes(decodedToken.userType);
      } catch (err) {
        console.error('Error checking authorization:', err);
      }
    }
    return false;
  };

  // State variable to track authorization status
  const [isAuthorizedState, setIsAuthorizedState] = useState(false);

  useEffect(() => {
    // Check authorization status when authentication status changes
    if (isAuthenticatedState) {
      const isUserAuthorized = isAuthorized();
      setIsAuthorizedState(isUserAuthorized);
    }
  }, [isAuthenticatedState]);

  if (!isAuthorizedState) {
    return <div>You are not authorized to access this page.</div>;
  }
  
  return (
    <>
      {React.Children.count(children) > 0 ? (
        React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            isAuthenticated: isAuthenticatedState,
            isAuthorized: isAuthorizedState,
          })
        )
      ) : null}
    </>
  );
}

export default ProtectedRoute;
