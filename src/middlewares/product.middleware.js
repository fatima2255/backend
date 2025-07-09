const rolePermissions = require('../utils/permissions');

const productAccess = (action) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: Role not found' });
    }

    const allowedRoles = rolePermissions.product[action];

    if (!allowedRoles || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
};

module.exports = productAccess;