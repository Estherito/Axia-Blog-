const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mock user database
const users = [];

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Extract username, email, and password

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user with a default role of 'user'
  users.push({ username, email, password: hashedPassword, role: 'user' });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  // Include role in the JWT payload
  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Example admin-only route
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.delete('/admin/delete-user', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin-only route accessed' });
});

module.exports = router;