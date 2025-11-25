export async function up(knex) {
  await knex.schema.createTable("permissions", (t) => {
    t.increments("id").primary();
    t.string("name").unique().notNullable();
    t.timestamps(true, true);
  });
}
export async function down(knex) {
  await knex.schema.dropTable("permissions");
}