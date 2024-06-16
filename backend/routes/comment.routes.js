// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// Route to create a new comment for a post
router.post('/api/posts/:postId/comments', commentController.createComment);

// Route to get all comments for a specific post
router.get('/api/posts/:postId/comments', commentController.getCommentsByPost);

// Route to update a specific comment
router.put('/comments/:commentId', commentController.updateComment);

// Route to delete a specific comment
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;
