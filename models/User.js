import db from "../src/utils/db.js";
import bcrypt from "bcryptjs";

const User = {
  async findByEmail(email) {
    return await db('users').where({ email }).first();
  },

  async findById(id){
    return await db("users").where({ id }).first();
  },

  async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    const [id] = await db('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        email_verified_at: now, // added column
        created_at: now,
        updated_at: now,
      })
      .returning('id');

    return id;
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  async all() {
    return await db('users').select('id', 'name', 'email', 'email_verified_at');
  },
};

export default User;