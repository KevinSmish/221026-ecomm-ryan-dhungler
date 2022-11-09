import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
// import formidableMiddleware from "express-formidable";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
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
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(formidableMiddleware());

// routes middleware
app.use("/api/users", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// Обработчик ошибок обязательно должен быть последним в цепочке
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Node server is running on port ${PORT}`));
