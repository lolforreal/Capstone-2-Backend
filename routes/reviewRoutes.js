// backend/routes/reviewRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Dummy data store for reviews
const reviews = [];
const JWT_SECRET = 'your_super_secret_key';

/**
 * Add a review for a product
 */
router.post('/:productId', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);

    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    const newReview = {
      id: reviews.length + 1,
      productId,
      userId: user.id,
      username: user.username,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * Get all reviews for a product
 */
router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const productReviews = reviews.filter(review => review.productId === productId);
  res.json(productReviews);
});

/**
 * Edit a review
 */
router.put('/:productId/:reviewId', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = reviews.find(r => r.id == reviewId && r.userId === user.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * Delete a review
 */
router.delete('/:productId/:reviewId', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const { reviewId } = req.params;

    const reviewIndex = reviews.findIndex(r => r.id == reviewId && r.userId === user.id);
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }

    reviews.splice(reviewIndex, 1);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
