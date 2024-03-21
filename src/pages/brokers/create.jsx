import React, { useState } from 'react';

export default function CreateBroker() {
  const [brokerData, setBrokerData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    setBrokerData({ ...brokerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform broker registration logic here
    console.log(brokerData);
    // Reset form
    setBrokerData({
      name: '',
      email: '',
      password: '',
      photo: '',
      phoneNumber: ''
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Broker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="name"
            value={brokerData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="email"
            name="email"
            value={brokerData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="password"
            name="password"
            value={brokerData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Photo:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="file"
            name="photo"
            value={brokerData.photo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="phoneNumber"
            value={brokerData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
