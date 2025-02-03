require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ ERROR: Missing MONGO_URI. Please set it in environment variables.");
    process.exit(1); // Stop the server if MONGO_URI is missing
}

// ✅ Corrected MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
