export async function up(knex) {
  await knex.schema.createTable("user_role", (t) => {
    t.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    t.integer("role_id").unsigned().references("id").inTable("roles").onDelete("CASCADE");
    t.primary(["user_id", "role_id"]);
  });
}
export async function down(knex) {
  await knex.schema.dropTable("user_role");
}