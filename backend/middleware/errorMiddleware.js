// errorHandler middleware function with four parameters: err, req, res, next
const errorHandler = (err, req, res, next) => {
    // Determine the status code based on the response status code or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500
  
    // Set the HTTP response status code
    res.status(statusCode)
  
    // Send a JSON response with error details
    res.json({
      message: err.message, // Set the 'message' field in the JSON response to the error message
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Include the error stack only in non-production environments
    })  
}
  
  // Export the errorHandler middleware function to be used in other parts of the application
  module.exports = {
    errorHandler,
  }