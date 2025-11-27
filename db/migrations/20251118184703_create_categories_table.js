export function up(knex) {
  return knex.schema.createTable("categories", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.timestamps(true,true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("categories");
}
