import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage and update login state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page if the user is not logged in
  };

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold text-shadow-lg">Job Tracker</h1>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
            <Link to="/jobs" className="text-white hover:text-gray-200">Add Jobs</Link>

            <div className="flex justify-end">
              {!isLoggedIn ? (
                <button
                  className="text-white bg-teal-500 hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md"
                  onClick={handleLoginRedirect} // Redirect to login page
                >
                  Login
                </button>
              ) : (
                <button
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
                  onClick={handleLogout} // Logout and redirect to login page
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
