export async function seed(knex) {
  await knex("role_permissions").del();
  await knex("user_roles").del();
  await knex("user_permissions").del();
  await knex("roles").del();
  await knex("permissions").del();

  // 1. Insert roles
  const roles = [
    { name: "Super" },
    { name: "Admin" },
  ];

  const [superAdmin, admin] =
    await knex("roles").insert(roles).returning("*");

  // 2. Permissions
  const permissions = [
    // Dashboard
    "view_dashboard",

    // Users
    "view_users",
    "create_users",
    "update_users",
    "delete_users",

    // Products
    "view_products",
    "create_products",
    "update_products",
    "delete_products",

    // Categories
    "view_categories",
    "create_categories",
    "update_categories",
    "delete_categories",

    // Projects
    "view_projects",
    "create_projects",
    "update_projects",
    "delete_projects"
  ].map((name) => ({ name }));

  const insertedPermissions = await knex("permissions")
    .insert(permissions)
    .returning("*");

  const permMap = Object.fromEntries(
    insertedPermissions.map((p) => [p.name, p.id])
  );

  // 3. Assign permissions to Admin
  const adminRolePermissions = 
  [
    { role_id: admin.id, permission_id: permMap["view_products"] },
    { role_id: admin.id, permission_id: permMap["update_products"] },

    // Category Manager
    { role_id: admin.id, permission_id: permMap["view_categories"] },
    { role_id: admin.id, permission_id: permMap["create_categories"] },
    { role_id: admin.id, permission_id: permMap["update_categories"] },

    // Project Manager
    { role_id: admin.id, permission_id: permMap["view_projects"] },
    { role_id: admin.id, permission_id: permMap["create_projects"] },
    { role_id: admin.id, permission_id: permMap["update_projects"] },
    { role_id: admin.id, permission_id: permMap["delete_projects"] }
  ]

  // 4. Assign permissions to Super (All) if needed
  // const superAdminRolePermissions = insertedPermissions.map((p) => ({
  //   role_id: superAdmin.id,
  //   permission_id: p.id
  // }));

  // 5. User role-permissions
  superUser = User.query().findOne('test@example.com');
  adminUser = User.query().findOne('admin@asd.com');
  const userRolePermissions = [
    { role_id: user.id, permission_id: permMap["view_dashboard"] },
    { role_id: user.id, permission_id: permMap["view_dashboard"] },
  ];
  
  await knex("user_role").insert([
    {user_id: superUser.id, role_id: super.id},
    {user_id: adminUser.id, role_id: admin.id},

  ]);

  await knex("user_permission").insert();

   // 6. Insert all role permissions
   await knex("role_permission").insert([
    ...adminRolePermissions,
    ...userRolePermissions
  ]);
  
}