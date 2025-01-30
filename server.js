const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Make sure the prefix matches what the frontend is calling)
app.use('/api/auth', authRoutes); //  Matches frontend request to `/api/auth/register`
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
