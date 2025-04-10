import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import JobForm from './components/jobsForm';
import DashBoard from "./pages/DashBoard";
import Home from './pages/Home';
import LoginPage from './pages/Login'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Protected Route wrapper logic (inline)
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }/>

        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobForm />
          </ProtectedRoute>
        }/>
      </Routes>

      <footer className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg">&copy; 2025 MyJobPortal. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
