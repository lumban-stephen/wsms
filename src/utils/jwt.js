import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token'); // Replace with your token retrieval logic
const decodedToken = jwt_decode<object>(token); // Use type annotation for decoded data

console.log(decodedToken);