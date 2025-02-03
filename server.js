require('dotenv').config();  // Ensure this is at the top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;  // Ensure you're using the environment variable

if (!MONGO_URI) {
    console.error("❌ ERROR: Missing MONGO_URI. Please set it in environment variables.");
    process.exit(1); // Stop the server if MONGO_URI is missing
}

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

// Attempt to Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,  // (NOT NEEDED for mongoose 7+)
    useUnifiedTopology: true, // (NOT NEEDED for mongoose 7+)
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);  // Exit if there's a connection error
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
