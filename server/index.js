import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes middleware
app.use("/api/users", authRoutes);
app.use("/api/category", categoryRoutes);

// Обработчик ошибок обязательно должен быть последним в цепочке
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Node server is running on port ${PORT}`));
