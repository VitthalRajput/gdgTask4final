const axios = require("axios"); // promise based http client to interact with api and fetch data from sever also handles assynchronous response

// 1️ Recommendation Endpoint 
exports.recommendProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    // Forward request to ML team’s endpoint (update URL when they host their model)
    // const response = await axios.post("http://localhost:8000/recommend", { userId });
    // return res.status(200).json(response.data);

    // Temporary placeholder (until ML team connects)
    return res.status(200).json({
      success: true,
      message: `Recommendation API working — waiting for ML integration.`,
      data: { userId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Recommendation endpoint failed", error: error.message });
  }
};

// 2️ Forecasting Endpoint
exports.forecastSales = async (req, res) => {
  try {
    // const response = await axios.get("http://localhost:8000/forecast");
    // return res.status(200).json(response.data);

    return res.status(200).json({
      success: true,
      message: "Forecast API working — waiting for ML response."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Forecast endpoint failed", error: error.message });
  }
};

// 3️ Visual Search Endpoint
exports.visualSearch = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    // const response = await axios.post("http://localhost:8000/visual-search", { imageUrl });
    // return res.status(200).json(response.data);

    return res.status(200).json({
      success: true,
      message: "Visual Search API working — waiting for ML connection.",
      data: { imageUrl }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Visual search endpoint failed", error: error.message });
  }
};
