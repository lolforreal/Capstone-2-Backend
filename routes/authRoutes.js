const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = []; // Temporary in-memory store (use a database in production)
const JWT_SECRET = 'your_super_secret_key';

/**
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Check if email or username is already taken
    const emailExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);

    if (emailExists) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    if (usernameExists) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { id: users.length + 1, email, username, password: hashedPassword };
    users.push(newUser);

    console.log(" User registered successfully:", newUser);
    return res.status(201).json({ message: 'User registered successfully', username });

  } catch (error) {
    console.error(" Error registering user:", error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
});

/**
 * User login
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    console.log(" User logged in:", username);
    return res.json({ message: 'Login successful', token, username });

  } catch (error) {
    console.error(" Error logging in user:", error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
});

module.exports = router;
