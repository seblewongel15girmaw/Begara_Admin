import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Index() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const response = await axios.get('/api/brokers'); // Replace '/api/brokers' with the appropriate API endpoint
      setBrokers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link
        to="/add-broker"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Broker
      </Link>
      <h1 className="text-2xl font-bold mb-4">Brokers List</h1>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr key={broker.id}>
              <td className="px-4 py-2">{broker.id}</td>
              <td className="px-4 py-2">{broker.name}</td>
              <td className="px-4 py-2">{broker.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}