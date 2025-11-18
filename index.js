import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ status: "OK", message: "Express API up" }));
app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
