import axios from "axios";

// Recommendation Model
export const recommendProducts = async (req, res) => {
  try {
    const { user_id, item_ids, category, fit } = req.body;

    const response = await axios.post(
      "https://ecommerce-recommendation-mdel-1.onrender.com/predict/",
      { user_id, item_ids, category, fit },
      { timeout: 10000 }
    );

    return res.status(200).json({
      success: true,
      message: "Recommendations fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Recommendation API Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
};

// Forecasting Model
export const forecastSales = async (req, res) => {
  try {
    const { sales, prices, promotions } = req.body;

    const response = await axios.post(
      "https://deployment-h9id.onrender.com/predict",
      { sales, prices, promotions },
      { timeout: 10000 }
    );

    return res.status(200).json({
      success: true,
      message: "Forecast fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Forecast API Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch forecast",
      error: error.message,
    });
  }
};

// Visual Search Model
export const visualSearch = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const response = await axios.post(
      "https://ecommerce-sense.onrender.com/search",
      { imageUrl },
      { timeout: 10000 }
    );

    return res.status(200).json({
      success: true,
      message: "Visual search results fetched",
      data: response.data,
    });
  } catch (error) {
    console.error("Visual Search API Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch visual search results",
      error: error.message,
    });
  }
};
