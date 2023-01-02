import express from "express";
import { body } from "express-validator";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middleware/authMiddleware.js";

// controllers
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  getToken,
  processPayment,
  orderStatus,
} from "../controllers/productController.js";

router.post("", requireSignin, isAdmin, formidable(), create);
router.get("", list);
router.get("/count", productsCount);
router.get("/page/:page", listProducts);
router.get("/photo/:productId", photo);
router.get("/search/:keyword", productsSearch);
router.get("/related/:productId/:categoryId", relatedProducts);
router.get("/token", getToken);
router.post("/payment", requireSignin, processPayment);
router.get("/:slug", read);
router.delete("/:productId", requireSignin, isAdmin, remove);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);
router.put("/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered", filteredProducts);

export default router;
