const express = require('express');
const authenticate = require('../middlewares/authenticate');
const posts = require('../models/postModel');

const router = express.Router();

// Create a new post
router.post('/', authenticate, (req, res) => {
  const { title, content } = req.body;
  const post = { id: posts.length + 1, title, content, author: req.user.email };
  posts.push(post);
  res.status(201).json(post);
});

// Get all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// Get a single post
router.get('/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Update a post
router.put('/:id', authenticate, (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.author !== req.user.email) return res.status(403).json({ error: 'Forbidden' });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json(post);
});

// Delete a post
router.delete('/:id', authenticate, (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });
  if (posts[postIndex].author !== req.user.email) return res.status(403).json({ error: 'Forbidden' });

  posts.splice(postIndex, 1);
  res.status(204).send();
});

module.exports = router;

router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedPosts = posts.slice(startIndex, endIndex);
  res.json(paginatedPosts);
});


router.get('/', (req, res) => {
  const { sortBy = 'id', order = 'asc' } = req.query;
  const sortedPosts = [...posts].sort((a, b) => {
    if (order === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  res.json(sortedPosts);
});