export function up(knex) { 
  return knex.schema.createTable("products", (table)=>{
    table.increments("id").primary();
    table.string('name').notNullable();
    table.decimal('price', 10, 2);
    table.text('description');
    table.integer('stock').default(0);
    table.timestamp('created_at').nullable();
    table.timestamp('updated_at').nullable();
  });

}
export function down(knex) {
  return knex.schema.dropTable("products");
}