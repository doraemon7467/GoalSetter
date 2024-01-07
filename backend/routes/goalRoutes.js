const express = require('express') // Import the Express framework
const router = express.Router()  // Create a router object using Express's Router class
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')  // Import goal controller functions

//to protect the routes
// Importing middleware for protecting routes
const { protect } = require('../middleware/authMiddleware')

//chaining
// Chaining routes using the router.route() method
router.route('/')  // Define routes for handling goals
.get(protect, getGoals)  // GET request to fetch goals (protected route)
.post(protect, setGoal)  // POST request to create a new goal (protected route)

router.route('/:id')  // Define routes for specific goal by ID
.delete(protect, deleteGoal)   // DELETE request to delete a specific goal (protected route)
.put(protect, updateGoal)  // PUT request to update a specific goal (protected route)

module.exports = router  // Export the router object for use in other parts of the application