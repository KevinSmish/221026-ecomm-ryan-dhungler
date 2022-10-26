import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.get("/users", (req, res, next) => {
  res.json({ data: "Hello, world!!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
