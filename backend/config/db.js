// Importing the Mongoose library for MongoDB interactions
const mongoose = require('mongoose')

// Defining an asynchronous function to establish the MongoDB connection
const connectDB = async () => {
  try {
    // Connecting to the MongoDB database using the connection string provided in the environment variable MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // console.log(`MongoDB Connected: ${conn.connection.host}`
    // conn.connection.host retrieves the hostname of the connected MongoDB instance.
    // conn.connection.name retrieves the name of the connected MongoDB database.
    console.log("Database Connected",conn.connection.host, conn.connection.name)
  } catch (error) {
    // Handling any errors that might occur during the database connection attempt
    console.log(error)
    // Exiting the Node.js process with a non-zero status (1) indicating an error
    process.exit(1)
  }
}
// Exporting the connectDB function to make it accessible from other files
module.exports = connectDB