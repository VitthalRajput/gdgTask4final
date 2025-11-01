import express from "express";

const router = express.Router();

// Mock ML endpoints
router.post("/recommend", (req, res) => {
  const { userId } = req.body;
  res.status(200).json({
    success: true,
    message: "Recommendation API working — waiting for ML integration.",
    data: { userId },
  });
});

router.post("/forecast", (req, res) => {
  const { productId } = req.body;
  res.status(200).json({
    success: true,
    message: "Forecast API working — waiting for ML integration.",
    data: { productId },
  });
});

router.post("/visual-search", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Visual Search API working — waiting for ML integration.",
  });
});

export default router; // 👈 VERY IMPORTANT
