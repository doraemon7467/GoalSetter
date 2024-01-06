const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

// Middleware for route protection
const { protect } = require('../middleware/authMiddleware');

// Handle OPTIONS method for '/api/goals' and '/api/goals/:id'
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

router.options('/:id', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Chained routes for goals CRUD operations
router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
