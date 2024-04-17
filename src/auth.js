const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'M23y?_+Sb[ynL`_WBpp2LOzbOct&rq');
    req.user = decodedToken; // Attach user data to request object for further use
    next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyJWT;