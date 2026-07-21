const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lms_super_secret_jwt_key_2026_antigravity');

      // Fetch user or inject decoded data
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        if (user.isBlocked) {
          return res.status(403).json({ message: 'Your account has been blocked by an administrator.' });
        }
        req.user = user;
      } else {
        req.user = { _id: decoded.id, role: decoded.role, name: 'User' };
      }
      return next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
