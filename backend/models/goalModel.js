const mongoose = require('mongoose')

// Defining the schema for the Goal model
const goalSchema = mongoose.Schema(
  {
    // User associated with the goal - referencing the User model
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of the user document
      required: true,
      ref: 'User',    // Refers to the 'User' model
    },
    // Text description of the goal
    text: {
      type: String,
      required: [true, 'Please add a text value'],  // Field is required with custom error message
    },

    completeTime : {
      type: String,
    },
    // Priority level of the goal
    priority : {
      type: Number,
      required : [true, 'Please select a priority'],
    },
  },
  {
    timestamps: true,  // Adds 'createdAt' and 'updatedAt' fields to track document creation and modification times
  }
)

// Creating and exporting the Goal model based on the goalSchema
module.exports = mongoose.model('Goal', goalSchema)