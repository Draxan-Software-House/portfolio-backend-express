import knex from "knex";
import config from "../../db/knexfile.js";

const db = knex(config);
export default db;
