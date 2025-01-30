// backend/routes/productRoutes.js

const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * Fetch all electronics from FakeStoreAPI
 */
router.get('/electronics', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/category/electronics');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
