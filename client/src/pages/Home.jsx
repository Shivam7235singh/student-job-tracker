import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-400 to-blue-700 text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white opacity-20 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">Welcome to MyJobPortal</h1>
        <p className="text-xl mb-8 drop-shadow-sm">
          Find your dream job or post your job openings on one platform.
        </p>
        <div className="space-x-4">
          <Link to="/joblist">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-md text-lg hover:bg-blue-100 transition shadow-md">
              Browse Jobs
            </button>
          </Link>
          <Link to="/post-job">
            <button className="bg-transparent border-2 border-white py-3 px-6 rounded-md text-lg hover:bg-white hover:text-blue-600 transition shadow-md">
              Post a Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
