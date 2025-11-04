import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from "../controllers/order.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User operations
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.delete("/:id", protect, cancelOrder);

// Admin operations
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
