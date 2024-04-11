


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export default function AdminIndex() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/${adminId}`);
      fetchAdmins(); // Refresh the brokers list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link
        to="/add-admin" className="mt-4  bg-blue-500 text-white rounded hover:bg-blue-600">
        Add New Admin
      </Link>
      <h1 className="text-2xl font-bold mb-4">System Admins List</h1>
      <table className="table table-bordered">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">UserName</th>
            <th className="px-4 py-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr >
             
              <td className="px-4 py-2">{admin.full_name}</td>
              <td className="px-4 py-2">{admin.email}</td> 
              <td className="px-4 py-2">{admin.phone_number}</td> 
              <td className="px-4 py-2">{admin.username}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/edit-broker/${admin.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaPen />
                </Link>
                <button
                  onClick={() => deleteBroker(admin.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}