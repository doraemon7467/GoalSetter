// Import necessary modules
const path = require('path'); // For working with file and directory paths
const express = require('express');  // Framework for creating the server
const colors = require('colors'); // Adds color to console logs (for readability)
const dotenv = require('dotenv').config();   // Loads environment variables from a .env file
const mongoose = require('mongoose')  // Library for MongoDB object modeling
const cors = require('cors');  // Middleware to enable Cross-Origin Resource Sharing
const { errorHandler } = require('./middleware/errorMiddleware');  // Custom error handling middleware
const connectDB = require('./config/db');  // Function to connect to MongoDB
const port = process.env.PORT || 5000;  // Sets the server port, defaults to 5000 if not specified in the environment variables

// Connect to MongoDB
connectDB();

// Initialize Express application
const app = express();

// Enable CORS for requests from a specific origin
app.use(cors({
  origin: 'https://goal-setter-eta.vercel.app', // use your actual domain name (or localhost), using * is not recommended . // Define the allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],  // Allowed headers
  credentials: true  // Allow credentials (e.g., cookies, authorization headers)
}))
//middleware so that we can access the req.body in POST reqs
// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes handling
app.use('/api/goals', require('./routes/goalRoutes')); // Routes for handling goals
app.use('/api/users', require('./routes/userRoutes')); // Routes for handling users
app.get('/api/test',async (req,res) => {
  res.json("OK");  // Test route to check if the server is running
})

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

//override the default express error handler
// Error handling middleware
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));