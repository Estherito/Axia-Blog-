const express = require('express');
const path = require('path');
require('dotenv').config();

const userRoutes = require(path.join(__dirname, 'routes', 'userRoutes')); // Import userRoutes

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Mount user routes

module.exports = app; // Export the app for use in server.js and tests

const postRoutes = require('./routes/postRoutes');

app.use('/api/posts', postRoutes); // Mount blog post routes

const posts = [
    { id: 1, title: 'First Post', content: 'Hello World!', author: 'user@example.com', comments: [] },
  ];
  
  module.exports = posts;

  // Add a comment
router.post('/:id/comments', authenticate, (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    const comment = { id: post.comments.length + 1, text: req.body.text, author: req.user.email };
    post.comments.push(comment);
    res.status(201).json(comment);
  });
  
  // Get comments for a post
  router.get('/:id/comments', (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    res.json(post.comments);
  });