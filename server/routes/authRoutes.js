import express from "express";
import { body } from "express-validator";
import { requireSignin, isAdmin } from "../middleware/authMiddleware.js";
import { users, register, login } from "../controllers/authController.js";

const router = express.Router();

// public routes
router.post(
  "/register",
  body("name").isString().isLength({ min: 3, max: 32 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  register
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  login
);

// protected routes
router.get("", requireSignin, isAdmin, users);

export default router;
