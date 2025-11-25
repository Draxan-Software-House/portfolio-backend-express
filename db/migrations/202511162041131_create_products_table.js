export function up(knex) { 
  return knex.schema.createTable("products", (t)=>{
    t.increments("id").primary();
    t.string('name').notNullable();
    t.decimal('price', 10, 2);
    t.text('description');
    t.integer('stock').default(0);
    t.timestamps(true, true);
  });

}
export function down(knex) {
  return knex.schema.dropTable("products");
}