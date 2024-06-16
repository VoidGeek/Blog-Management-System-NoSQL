import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import UserService from '../../services/user.service'; // Adjust the path as per your file structure

function PostCard({ post, image, loading, onClick }) {
  const [username, setUsername] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUserById(post.adminUser);
        setUsername(userData.username); // Assuming username is a field in userData
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error fetching user data
      }
    };

    fetchUser();
  }, [post.adminUser]); // Run effect when post.adminUser changes

  const formattedDate = format(new Date(post.submittedAt), 'MMMM d, yyyy');

  // Function to handle card click and trigger onClick handler
  const handleClick = () => {
    onClick(post._id); // Pass post ID to parent component
  };

  return (
    <div className="my-4" style={{ maxWidth: '500px', cursor: 'pointer' }}>
      <Link to={`/home/feeds/${post._id}`} className="block">
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg shadow-lg p-6">
          {loading ? (
            <Skeleton height={256} />
          ) : (
            <>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                  {/* Display a dummy profile logo */}
                  <Skeleton circle={true} width={16} height={16} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {username} {/* Display admin username */}
                  </h2>
                  <div className="text-sm text-gray-200">
                    Posted on: {formattedDate} {/* Display formatted date */}
                  </div>
                </div>
              </div>
              {image && (
                <div className="h-96 rounded overflow-hidden mb-4 mx-auto flex justify-center">
                  <img
                    src={image.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover square-image"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">
                {post.caption} {/* Display post caption */}
              </h2>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
