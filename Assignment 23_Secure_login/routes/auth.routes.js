const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Profile data retrieved successfully',
    user: req.user
  });
});

module.exports = router;
