import RBACService from '../services/RBACService.js';

rolePermission = (requiredRole) => {
  return async (req,res,next) => {
    try {
      const user = req.user;
      // 1. Super Admin bypass (Laravel Gate::before)
      if (RBACService.isSuperAdmin(user)) {
        return next();
      }

      // 2. Check roles or permissions
      const hasAccess = RBACService.hasRoleOrPermission(user, required);

      if (!hasAccess) {
        return res.status(403).json({
          message: "Forbidden. You don't have the required access."
        });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

export default rolePermission;