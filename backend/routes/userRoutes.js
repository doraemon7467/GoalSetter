const express = require('express')  // Import the Express framework
const router = express.Router()  // Create a router object using Express's Router class
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController') // Import user controller functions

const { protect } = require('../middleware/authMiddleware')  // Import authentication middleware

// Define routes using the router object

// Route for user registration
router.post('/', registerUser)

// Route for user login
router.post('/login', loginUser)

// Route to get user profile
router.get('/me', protect, getMe)

module.exports = router // Export the router object for use in other parts of the application