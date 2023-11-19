import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-extrabold mb-8">Student Management System</h2>
      <ul className="text-xl text-center space-y-4">
      
        <li>
          <Link to="/add" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
            Add Student
          </Link>
        </li>
        <li>
          <Link to="/students" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
            View / Delete Students
          </Link>
        </li>
        <li>
          <Link to="/update" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
            Update Student Details
          </Link>
        </li>
        <li>
          
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
