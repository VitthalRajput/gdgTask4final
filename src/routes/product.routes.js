import express from "express";
import { getProducts, createProduct } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/", protect, createProduct);
export default router;
