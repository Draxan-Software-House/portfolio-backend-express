import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex("users").del();

  const hash = await bcrypt.hash("password", 10);

  await knex("users").insert([
    {
      name: "Test",
      email: "test@example.com",
      password: hash
    }
  ]);
}
