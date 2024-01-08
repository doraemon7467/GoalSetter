const jwt = require('jsonwebtoken')  // Importing JSON Web Token module
const asyncHandler = require('express-async-handler')  // Importing asyncHandler
const User = require('../models/userModel')  // Importing User model

// Middleware to protect routes requiring authentication
const protect = asyncHandler(async (req, res, next) => {
  let token;  // Declare a variable to store the token

  // Check if Authorization header with Bearer token is present in the request
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token using the secret Key
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Retrieve user details from the token payload and exclude password field
      req.user = await User.findById(decoded.id).select('-password')

      // Continue to the next middleware/route handler
      next()
    } catch (error) {
      console.log(error)
      res.status(401)  // Unauthorized status code
      throw new Error('Not authorized')  // Throw error if token verification fails
    }
  }

  // Check if no token was found in the header
  if (!token) {
    res.status(401)  // Unauthorized status code
    throw new Error('Not authorized, no token')  // Throw error indicating no token was provided
  }
})

module.exports = { protect }  // Export the protect middleware for use in other files