const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, yourSecretKey);
    req.user = decoded; // Attach decoded user information to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};