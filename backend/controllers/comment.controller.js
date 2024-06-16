// controllers/commentController.js
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
      const { text, user } = req.body;
      const { postId } = req.params;
  
      // Create a new comment
      const newComment = new Comment({
        text,
        user: user || 'Anonymous', // Default to 'Anonymous' if user is not provided
      });
  
      // Save the comment
      const savedComment = await newComment.save();
  
      // Find the post by ID and add the comment to it
      console.log(postId)
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.push(savedComment._id);
      await post.save();
  
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  };
  
  // Get all comments for a post
  exports.getCommentsByPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId).populate('comments');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving comments', error });
    }
  };

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('comments');
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments', error });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;

    // Find the post and remove the comment reference
    const post = await Post.findById(postId);
    post.comments.pull(commentId);
    await post.save();

    // Remove the comment
    await Comment.findByIdAndRemove(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
