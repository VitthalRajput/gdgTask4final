import express from "express";
import { recommendProducts, forecastSales, visualSearch } from "../controllers/mlController.js";

const router = express.Router();

router.post("/recommend", recommendProducts);
router.post("/forecast", forecastSales);
router.post("/visual-search", visualSearch);

export default router;
