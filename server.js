const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// ✅ Use Render's assigned port or default to 3001 (for local development)
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "your-local-mongodb-uri"; 

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
