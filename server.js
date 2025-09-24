import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("StudyMate backend is running 🚀");
});

// ✅ Test DB connection
app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// Listen on Render’s port (process.env.PORT) and all interfaces
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
