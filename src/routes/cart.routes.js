import express from "express";
import { getCart, addToCart } from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
export default router;
