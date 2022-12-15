import express from "express";
import { body } from "express-validator";
import { requireSignin, isAdmin } from "../middleware/authMiddleware.js";
import {
  create,
  read,
  update,
  remove,
  list,
  productsByCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "",
  body("name").isString().isLength({ min: 3, max: 32 }),
  requireSignin,
  isAdmin,
  create
);

router.get("/list", list);
router.get("/products/:slug", productsByCategory);
router.get("/:slug", read);

router.put(
  "/:categoryId",
  body("name").isString().isLength({ min: 3, max: 32 }),
  requireSignin,
  isAdmin,
  update
);

router.delete("/:categoryId", requireSignin, isAdmin, remove);

export default router;
