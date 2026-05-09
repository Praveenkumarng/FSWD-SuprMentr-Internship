const express = require('express');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

// @desc    Get user dashboard (Accessible by user and admin)
// @route   GET /api/dashboard/user
// @access  Private (User/Admin)
router.get('/user', protect, authorizeRoles('user', 'admin'), (req, res) => {
  res.json({
    message: 'Welcome to the User Dashboard',
    user: req.user
  });
});

// @desc    Get admin dashboard (Accessible only by admin)
// @route   GET /api/dashboard/admin
// @access  Private (Admin only)
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({
    message: 'Welcome to the Admin Dashboard. You have full privileges.',
    admin: req.user
  });
});

module.exports = router;
