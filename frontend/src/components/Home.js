import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WelcomeSection = ({ loading }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <section className="h-screen bg-gradient-to-b from-green-100 to-blue-100 text-black flex justify-center items-center relative overflow-x-hidden">
      <div className="absolute bg-gradient-to-b from-red-100 to-blue-200 shadow-md mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-full text-center md:text-left md:pr-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Explore Our Website
          </h2>
          <Link to="/contactUs">
            <button className="relative bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 text-base md:text-lg lg:text-xl hover:from-green-600 hover:to-green-400 transition-transform duration-500 ease-in-out hover:-translate-y-2 overflow-hidden group">
              <span className="relative z-10">Feel Free to Ask</span>
              <span className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-green-200 via-green-300 to-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>
            </button>
          </Link>
        </div>
        <div className="md:w-full text-center relative">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <img
              src="/circle.png"
              alt="Circle Logo"
              className="absolute w-1/3 md:w-1/4 lg:w-1/6 h-auto object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4"
            />
            {imageLoading ? (      
              <div className="fixed top-0 left-0 w-full h-full bg-gray-300 animate-pulse object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4 z-50"></div>
            ) : null}
            <img
              src="/banner(1).webp"
              alt="Company Logo"
              className={`object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4 mt-4 md:mt-8 ${
                imageLoading ? 'hidden' : 'block'
              }`}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const WelcomeSectionSkeleton = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-green-100 to-blue-100 text-black flex justify-center items-center relative overflow-x-hidden">
      <div className="absolute bg-gradient-to-b from-red-100 to-blue-200 shadow-md mx-auto flex flex-col md:flex-row items-center w-full h-full">
        <div className="md:w-full text-center md:text-left md:pr-8">
          <div className="animate-pulse text-2xl md:text-3xl lg:text-4xl font-bold h-10 w-60 bg-gray-300 rounded-full mb-4"></div>
          <div className="animate-pulse h-12 w-44 bg-gray-300"></div>
        </div>
        <div className="md:w-full text-center relative">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <div className="animate-pulse absolute w-1/3 md:w-1/4 lg:w-1/6 h-auto object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4"></div>
            <div className="animate-pulse object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4 mt-4 md:mt-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay for demonstration purposes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      {loading ? (
        <WelcomeSectionSkeleton />
      ) : (
        <WelcomeSection />
      )}
    </div>
  );
};

export default Homepage;
