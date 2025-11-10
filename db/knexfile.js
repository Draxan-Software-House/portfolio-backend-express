import path from "path";

export default {
  client: "sqlite3",
  connection: {
    filename: path.resolve("./database.sqlite")
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve("./migrations")
  },
  seeds: {
    directory: path.resolve("./seeds")
  }
};