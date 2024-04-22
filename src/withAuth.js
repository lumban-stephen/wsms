const withAuth = (WrappedComponent) => (props) => {
    const decodedToken = jwt_decode(localStorage.getItem('token'));
    const userType = decodedToken.userType;
  
    if (!userType) {
      return <Navigate to="/login" />; // Redirect to login if no JWT or userType
    }
  
    if (userType === 'Staff' && props.allowedRoles.includes('Staff')) {
      return <WrappedComponent {...props} />;
    } else if (userType === 'Admin' && props.allowedRoles.includes('Admin')) {
      return <WrappedComponent {...props} />;
    } else if (userType === 'WS' && props.allowedRoles.includes('WS')) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
    }
  };
  
  export default withAuth(StaffDashboard);