export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamp('email_verified_at').nullable();
    table.timestamp('created_at').nullable();
    table.timestamp('updated_at').nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
