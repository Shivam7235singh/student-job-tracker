import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import axios from 'axios'; // For making API requests

const LoginPage = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend API
      const response = await axios.post('/api/users', {name ,  email, password });

      // If login is successful, save token to localStorage and set login state
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);

      // Redirect to the home page after successful login
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
