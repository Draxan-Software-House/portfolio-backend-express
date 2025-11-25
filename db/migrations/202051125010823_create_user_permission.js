export async function up(knex) {
  await knex.schema.createTable("user_permission", (t) => {
    t.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    t.integer("permission_id").unsigned().references("id").inTable("permissions").onDelete("CASCADE");
    t.primary(["user_id", "permission_id"]);
  });
}
export async function down(knex) {
  await knex.schema.dropTable("user_permission");
}