import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.js";
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ status: "OK", message: "Express API up" }));
app.use("/api/auth", router);
app.use('/api',apiRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
