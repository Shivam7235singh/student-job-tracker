import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null); // Track the job whose options are visible
  const BASE_URL = import.meta.env.VITE_SERVER_URI ;
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/jobs`);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.status === filter));
    }
  }, [filter, jobs]);

  const updateStatus = async (jobId, status) => {
    try {
      await axios.put(`${BASE_URL}/api/jobs/${jobId}`, { status });
      const updatedJobs = jobs.map((job) =>
        job._id === jobId ? { ...job, status } : job
      );
      setJobs(updatedJobs);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`${BASE_URL}/api/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleOptions = (jobId) => {
    setActiveJob(activeJob === jobId ? null : jobId); // Toggle the job's options
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-600">Job Applications</h2>
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-gray-600">Role</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Date of Application</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">{job.role}</td>
                  <td className="px-6 py-4">{job.status}</td>
                  <td className="px-6 py-4">{new Date(job.appliedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      onClick={() => toggleOptions(job._id)} // Toggle options
                    >
                      {activeJob === job._id ? 'Hide Options' : 'Show Options'}
                    </button>

                    {/* Conditionally render the options */}
                    {activeJob === job._id && (
                      <div className="mt-2 space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                          onClick={() => updateStatus(job._id, 'Interview')}
                        >
                          Update to Interview
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          onClick={() => updateStatus(job._id, 'Offer')}
                        >
                          Update to Offer
                        </button>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() => updateStatus(job._id, 'Applied')}
                        >
                          Update to Applied
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          onClick={() => deleteJob(job._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobList;
