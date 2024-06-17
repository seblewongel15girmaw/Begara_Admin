import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export default function BrokerIndex() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/brokers');
      setBrokers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBroker = async (brokerId) => {
    try {
      await axios.delete(`http://localhost:3000/api/brokers/${brokerId}`);
      fetchBrokers(); // Refresh the brokers list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link
        to="/add-broker"  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add House Supplier
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-3">House Supplier List</h1>
      <table className="table table-bordered">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number1</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr >
             
              <td className="px-4 py-2">{broker.full_name}</td>
              <td className="px-4 py-2">{broker.email}</td> 
              <td className="px-4 py-2">{broker.phone_number1}</td> 
              <td className="px-4 py-2">{broker.address}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/edit-broker/${broker.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaPen />
                </Link>
                <button
                  onClick={() => deleteBroker(broker.id)}
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