/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("project_tag", (t) => {
    t.integer("project_id").unsigned().references("id").inTable("projects").onDelete("CASCADE");
    t.integer("tag_id").unsigned().references("id").inTable("tags").onDelete("CASCADE");
    t.primary(["project_id", "tag_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("project_tag");
}
