import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Corrected import

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login/logout state
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <h1 className="text-white text-2xl font-bold text-shadow-lg">Job Tracker</h1>
          </div>

          <div className="hidden md:flex space-x-8">
            {/* Nav Links */}
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-200">DashBoard</Link>
            <Link to="/jobs" className="text-white hover:text-gray-200">Jobs</Link>
            
            <div className="flex justify-end">
              {!isLoggedIn ? (
                <button
                  className="text-white bg-teal-500 hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md"
                  onClick={handleLoginRedirect} // Navigate to login page on click
                >
                  Login
                </button>
              ) : (
                <button
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
                  onClick={toggleLoginLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/dashboard" className="text-white">DashBoard</Link>
          <Link to="/jobs" className="text-white">Jobs</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
