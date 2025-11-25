class RBACService {
  static isSuperAdmin(user) {
    return user?.roles?.includes("Super");
  }

  static hasRoleOrPermission(user, required = []) {
    if (!user) return false;

    const roles = user.roles || [];
    const permissions = user.permissions || [];

    return required.some(r =>
      roles.includes(r) || permissions.includes(r)
    );
  }
}

export default RBACService;