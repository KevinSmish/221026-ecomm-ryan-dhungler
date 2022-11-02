import express from "express";
import { body } from "express-validator";
import { requireSignin, isAdmin } from "../middleware/authMiddleware.js";
import { create } from "../controllers/categoryController.js";

const router = express.Router();

// public routes
router.post(
  "",
  body("name").isString().isLength({ min: 3, max: 32 }),
  requireSignin,
  isAdmin,
  create
);

export default router;
