const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. ${req.user.role.toUpperCase()} role is not authorized for this action.`
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
