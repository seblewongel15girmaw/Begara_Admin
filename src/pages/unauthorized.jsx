// src/UnauthorizedPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-primary">Unauthorized Access</h1>
        <p>You are not authorized to access this page.</p>
        <div className="mt-5">
        <Link to={'/'} className="p-2 bg-primary rounded text-white font-bold mt-4">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
