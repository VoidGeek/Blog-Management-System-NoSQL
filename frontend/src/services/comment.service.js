import axios from "axios";

const API_URL = process.env.NODE_ENV === "production" ? "/api" : "/api";  // Replace with your actual API URL

// Fetch all comments for a specific post
const getCommentsByPostId = (postId) => {
  return axios
    .get(`${API_URL}/posts/${postId}/comments`, {
      withCredentials: true, // Include credentials (cookies) with the request
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching comments for post:", error);
      throw error;
    });
};

// Create a new comment for a specific post
const createComment = (postId, newComment) => {
  return axios
    .post(`${API_URL}/posts/${postId}/comments`, newComment, {
      withCredentials: true, // Include credentials (cookies) with the request
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating a comment:", error);
      throw error;
    });
};

// Update an existing comment
const updateComment = (commentId, updatedComment) => {
  return axios
    .put(`${API_URL}/comments/${commentId}`, updatedComment, {
      withCredentials: true, // Include credentials (cookies) with the request
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating the comment:", error);
      throw error;
    });
};

// Delete a comment from a specific post
const deleteComment = (postId, commentId) => {
  return axios
    .delete(`${API_URL}/posts/${postId}/comments/${commentId}`, {
      withCredentials: true, // Include credentials (cookies) with the request
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting the comment:", error);
      throw error;
    });
};

const CommentService = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};

export default CommentService;
