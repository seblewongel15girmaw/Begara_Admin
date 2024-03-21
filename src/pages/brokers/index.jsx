import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    // Fetch brokers data here
    // Replace the fetchBrokers() function with your actual API call
    addBrokers();
  }, []);

  const addBrokers = () => {
    // Simulating API call
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Broker 1', location: 'Location 1' },
        { id: 2, name: 'Broker 2', location: 'Location 2' },
        { id: 3, name: 'Broker 3', location: 'Location 3' }
      ];
      setBrokers(mockData);
    }, 1000);
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
            <th className="px- py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map(broker => (
            <tr key={broker.id} >
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