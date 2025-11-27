/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  await knex.schema.createTable("projects", (t)=>{
    t.increments("id").primary();
    t.string("title").unique().notNullable();
    t.string("desc").nullable();
    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTableIfExists('projects');
};
