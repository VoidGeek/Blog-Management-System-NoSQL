// models/Comment.js
const mongoose = require('mongoose');

// Define the schema for the Comment model
const commentSchema = new mongoose.Schema({
  text: {
    type: String, // The text of the comment
    required: true, // This field is required
  },
  user: {
    type: String, // The username of the commenter
    default: 'Anonymous', // Default to 'Anonymous' if not provided
  },
  createdAt: {
    type: Date, // The date and time when the comment was created
    default: Date.now, // Default to the current date and time
  },
});

// Export the Comment model based on the commentSchema
module.exports = mongoose.model('Comment', commentSchema);
