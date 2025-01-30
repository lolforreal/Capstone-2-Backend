// backend/data/data.js

// Dummy users (For development purposes only)
const users = [
    { id: 1, username: 'testuser', password: '$2b$10$abcdefg1234567890hashed' }, // Example hashed password
  ];
  
  // Dummy reviews (For testing review features)
  const reviews = [
    { id: 1, productId: '1', userId: 1, username: 'testuser', rating: 5, comment: 'Great product!', createdAt: '2025-01-29T12:00:00Z' },
  ];
  
  module.exports = { users, reviews };
  