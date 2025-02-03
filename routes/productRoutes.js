const express = require('express');
const axios = require('axios'); // Import axios for API requests

const router = express.Router();

// ✅ Fetch Electronics Products from FakeStore API
router.get('/electronics', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/category/electronics');
    
    if (!response.data.length) {
      return res.status(404).json({ error: "No products found in FakeStore API" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching products from FakeStore API:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

module.exports = router;
