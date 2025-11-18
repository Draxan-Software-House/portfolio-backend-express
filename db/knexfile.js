import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname,"./database.sqlite")
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname,"./migrations")
  },
  seeds: {
    directory: path.resolve(__dirname,"./seeds")
  }
};