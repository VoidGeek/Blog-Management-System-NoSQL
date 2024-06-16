// models/Post.js
const mongoose = require('mongoose');

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  caption: {
    type: String, // The caption of the post
    required: true, // This field is required
  },
  description: {
    type: String, // The caption of the post
    required: true, // This field is required
  },
  adminUser: {
    type: String, // Store the admin's username as a string
    required: true, // Make it a required field
  },
  submittedAt: {
    type: Date, // The date and time when the post was submitted
    default: Date.now, // Default to the current date and time
  },
  updatedAt: {
    type: Date, // The date and time when the post was last updated
  },
  post_image: {
    type: String, // URL or path to the post image
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId, // Reference to Comment model
    ref: 'Comment', // The name of the Comment model
  }],
});

// Middleware to set the updatedAt field to the current date before updating a post
postSchema.pre("findOneAndUpdate", function () {
  this._update.updatedAt = new Date();
});

// Export the Post model based on the postSchema
module.exports = mongoose.model('Post', postSchema);
