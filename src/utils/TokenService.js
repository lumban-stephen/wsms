export const parseToken = (token) => {
    try {
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      return parsedToken;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };
  
  export const getUserDepartment = (token) => {
    // Assuming 'department' is the property containing user department in your token
    const parsedData = parseToken(token);
    return parsedData?.department;
  };