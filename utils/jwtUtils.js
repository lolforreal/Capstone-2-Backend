// backend/utils/jwtUtils.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_super_secret_key';

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyToken };
