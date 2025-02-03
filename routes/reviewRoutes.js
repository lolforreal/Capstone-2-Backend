const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product'); // Ensure this is imported

const router = express.Router();

// ✅ Add a review for a product
router.post('/add', async (req, res) => {
  try {
    const { productId, username, rating, comment } = req.body;

    if (!productId || !username || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Save review in MongoDB
    const newReview = new Review({ productId, username, rating, comment });
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully' });

  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Server error while adding review' });
  }
});

// ✅ Get all reviews for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch reviews linked to the product
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error while fetching reviews' });
  }
});

module.exports = router;
