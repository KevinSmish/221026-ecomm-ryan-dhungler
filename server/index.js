import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import User from "../models/user.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// routes middleware
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
