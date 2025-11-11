import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex("users").del();

  const hash = await bcrypt.hash("admin123", 10);

  await knex("users").insert([
    {
      name: "Admin",
      email: "admin@test.com",
      password: hash
    }
  ]);
}
