import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function CreateAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    gender: '',
    phone_number: '',
    password:''

    
  });

  const handleInputChange = (e) => {
    
    if (e.target.name === 'profile_pic') {
      setFormData({ ...formData, profile_pic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log(formData);
      const response = await axios.post('http://localhost:3000/api/admin/register', formData);

      // Handle the response as needed (e.g., display a success message)
      console.log(response);



      // Reset form
      setFormData({
        full_name: '',
        username: '',
        email: '',
        gender: '',
        phone_number: '',
        password:''
       

      });
      // Navigate to '/manage-brokers'
      navigate('/admins');

    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Full Name:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="username"
            value={formData.username}
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
            value={formData.email}
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
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      
        <div className="mb-4">
          <label className="block mb-2">Phone Number :</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        
     
       
        <button
  className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4"
  type="submit">
  Register
</button>
      </form>
    </div>
  );
}