export async function up(knex) {
  return knex.schema.createTable("products", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.text("description").nullable();
    t.decimal("price", 12, 2).notNullable().defaultTo(0);
    t.integer("stock").notNullable().defaultTo(0);
    // 👇 Add category_id FK for Objection relationMappings
    t.integer("category_id").unsigned().nullable().references("id").inTable("categories").onDelete("SET NULL").onUpdate("CASCADE");
    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("products");
}