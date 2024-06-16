import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import PostService from '../services/post.service';
import ImageService from '../services/image.service';
import UserService from '../services/user.service';
import CommentService from '../services/comment.service';

const SkeletonCard = () => {
  return (
    <div className="my-4">
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg shadow-lg p-4">
        <div className="w-72 h-72 rounded overflow-hidden mb-4 mx-auto bg-gray-300"></div>
        <h2 className="text-xl font-bold mb-2">
          <div className="bg-gray-300 h-8 w-72 animate-pulse mb-2"></div>
        </h2>
        <div className="text-white">
          <p className="text-sm text-gray-200 mb-2">
            Posted on: <span className="bg-gray-300 w-100 h-6 animate-pulse"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

const FeedView = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState(''); // State to hold the new comment text
  const { postId } = useParams(); // Extract postId from URL params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [posts, imageData] = await Promise.all([
          PostService.getAllPosts(),
          ImageService.getAllImages(),
        ]);
        
        // Assuming PostService and ImageService return data in proper format
        posts.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setAllPosts(posts);
        setImages(imageData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the posts array based on postId from URL params
    const filteredPost = allPosts.find(post => post._id === postId);
    setCurrentPost(filteredPost);

    // Fetch comments for the current post
    const fetchComments = async () => {
      try {
        const commentsData = await CommentService.getCommentsByPostId(postId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [allPosts, postId]);

  const renderSinglePostCard = () => {
    if (!currentPost) return null; // Handle case when post is not found

    const image = images.find(img => img.s3Key === currentPost.post_image);

    return (
      <div className="max-w-4xl mx-auto flex items-start">
        <div className="max-w-3xl w-full">
          <div className="bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-2">{currentPost.title}</h2>
              <div className="text-sm text-gray-200">
                Posted on: {format(new Date(currentPost.submittedAt), 'MMMM d, yyyy')}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                By {currentPost.adminUser ? (
                  <UsernameDisplay userId={currentPost.adminUser} />
                ) : (
                  <Skeleton width={100} />
                )}
              </div>
            </div>
            <div className="text-left mb-4">
              <h2 className="text-2xl font-bold mb-4">{currentPost.caption}</h2>
              <p className="text-lg text-gray-800">{currentPost.description}</p>
            </div>
          </div>
        </div>
        {image && (
          <div className="ml-8">
            <img
              src={image.imageUrl}
              alt="Post"
              className="w-72 h-72 object-cover rounded"
            />
            <div className="text-center mt-2 text-sm text-gray-600">
              {image.caption}
            </div>
          </div>
        )}
      </div>
    );
  };

  const UsernameDisplay = ({ userId }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await UserService.getUserById(userId);
          setUsername(userData.username);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }, [userId]);

    return username ? <span>{username}</span> : null;
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Create a new comment using CommentService
      const newComment = await CommentService.createComment(postId, {
        text: newCommentText,
        user: 'Anonymous', // Example: You may replace this with actual user data or remove it
        createdAt: new Date(),
      });

      // Update the comments state with the new comment
      setComments([...comments, newComment]);

      // Clear the comment input field after submission
      setNewCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const renderCommentsSection = () => {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            rows="3"
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Comment
          </button>
        </form>
        <div>
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <div
                key={comment._id}
                className={`bg-gradient-to-r from-${index % 2 === 0 ? 'blue-200' : 'purple-200'} to-${index % 2 === 0 ? 'purple-200' : 'blue-200'} rounded-lg shadow-lg p-4 mb-4`}
              >
                <div className="flex mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{comment.user}</span>
                      <span className="text-sm text-gray-600">{format(new Date(comment.createdAt), 'MMMM d, yyyy')}</span>
                    </div>
                    <p className="text-gray-800 mb-1">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    );
  };
  
  
  

  return (
    <section className="py-16 bg-gradient-to-b from-blue-300 to-gray-300">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">FEEDS</h2>
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="flex space-x-4">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <>
              {renderSinglePostCard()}
              {renderCommentsSection()}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedView;
