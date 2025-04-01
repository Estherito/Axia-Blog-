const express = require('express');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Example protected route
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}!` });
});

module.exports = router;

const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Example admin-only route
router.delete('/admin/delete-user', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin-only route accessed' });
});