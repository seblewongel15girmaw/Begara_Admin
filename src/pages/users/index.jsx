import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserIndex() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Link
        to="/add-user"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add User
      </Link>
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 whitespace-nowrap">ID</th>
            <th className="px-4 py-2 whitespace-nowrap">Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.full_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}