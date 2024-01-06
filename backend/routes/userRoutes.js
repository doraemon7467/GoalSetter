const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// Handle OPTIONS method for '/api/users/login'
router.options('/login', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Register user
router.post('/', registerUser);

// Login user
router.post('/login', loginUser);

// Get user data
router.get('/me', protect, getMe);

module.exports = router;
