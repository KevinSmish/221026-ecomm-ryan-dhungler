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
  remove, update,
} from "../controllers/productController.js";

router.post("", requireSignin, isAdmin, formidable(), create);
router.get("", list);
router.get("/photo/:productId", photo);
router.get("/:slug", read);
router.delete("/:productId", requireSignin, isAdmin, remove);
router.put("/:productId", requireSignin, isAdmin, formidable(), update);

/*
// controllers
import {
  update,
  filteredProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  getToken,
  processPayment,
  orderStatus,
} from "../controllers/product.js";





router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

*/

export default router;
