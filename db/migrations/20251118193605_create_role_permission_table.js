export async function up(knex) {
  await knex.schema.createTable("role_permission", (t) => {
    t.integer("role_id").unsigned().references("id").inTable("roles").onDelete("CASCADE");
    t.integer("permission_id").unsigned().references("id").inTable("permissions").onDelete("CASCADE");
    t.primary(["role_id", "permission_id"]);
  });
}
export async function down(knex) {
  await knex.schema.dropTable("role_permission");
}