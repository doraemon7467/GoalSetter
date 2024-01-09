const asyncHandler = require('express-async-handler')  // Importing a utility function to handle asynchronous functions in Express route handlers

const Goal = require('../models/goalModel') // Importing the Goal model
const User = require('../models/userModel') // Importing the User model

// Controller functions for handling different CRUD operations related to goals

// Get goals for a specific user
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  // Fetch goals associated with the current user
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals) // Return the goals in JSON format
})

// Set a new goal for the current user
// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  // Validation checks for incoming data
  if (!req.body.text) {
    res.status(400)
    //using the builtin express error handle, it will give us html page
    //but we have overriden the default error handler
    throw new Error('Please add a text field')
  }

  if(req.body.priority.priority <= 0){
    res.status(400)
    throw new Error("Please set a positive priority");
  }

  if(new Date(req.body.completeTime.completeTime) < (new Date())){
    res.status(400)
    throw new Error("Please set a completion date later than the current date");
  }

  // console.log(req.body);
  // Create a new goal based on the incoming data
  const goal = await Goal.create({
    completeTime: req.body.completeTime.completeTime,
    priority: req.body.priority.priority,
    text: req.body.text.text,
    user: req.user.id,
  })

  res.status(200).json(goal) // Return the newly created goal in JSON format
})

// Update an existing goal
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler( (req, res) => {
  // Find the goal by ID
  const goal =  Goal.findById(req.params.id)

  // Check if the goal exists
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  // User Authorization Checks
  // Check if the logged-in user matches the goal's user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }


 // Validation checks for incoming data
  if(req.body.priority.priority <= 0){
    res.status(400)
    throw new Error("Please set a positive priority");
  }

  if(new Date(req.body.completeTime.completeTime) < (new Date())){
    res.status(400)
    throw new Error("Please set a completion date later than the current date");
  }

  console.log(req.body);
  // Update the goal with the new data
  const updatedGoal =  Goal.updateOne({_id : req.params.id}, {text : req.body.text.text, completeTime : req.body.completeTime.completeTime, priority : req.body.priority.priority});

  res.status(200).json(updatedGoal) // Return the updated goal in JSON format
})

// Delete a goal
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // Find the goal by ID
  const goal = await Goal.findById(req.params.id)

  // Check if the goal exists
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  // Check if the logged-in user matches the goal's user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Delete the goal
  await goal.deleteOne()

  res.status(200).json({ id: req.params.id })  // Return the ID of the deleted goal in JSON format
})

// Exporting the controller functions to be used in routes
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}