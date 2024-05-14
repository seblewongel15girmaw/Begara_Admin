import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FeedbackIndex() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
    
      <h1 className="text-2xl font-bold mb-4">Feedback List</h1>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-200">
          <th className="px-4 py-2 whitespace-nowrap text-center">date</th>

            <th className="px-4 py-2 whitespace-nowrap text-center ">user name</th>
            <th className="px-4 py-2 whitespace-nowrap text-center">feedback rating</th>
            <th className="px-4 py-2 whitespace-nowrap text-center">feedback messages</th>
            <th className="px-4 py-2 whitespace-nowrap text-center">feedback category</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
             <td className="px-4 py-2 whitespace-nowrap text-center">{new Date(feedback.createdAt).toLocaleDateString()}</td>
    <td className="px-4 py-2 whitespace-nowrap text-center">{feedback.username}</td>
    <td className="px-4 py-2 whitespace-nowrap text-center">{feedback.rating}</td>
    <td className="px-4 py-2 whitespace-nowrap text-center">{feedback.feedback_message}</td>
    <td className="px-4 py-2 whitespace-nowrap text-center">{feedback.feedback_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}