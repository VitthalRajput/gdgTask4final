import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
export default router;
