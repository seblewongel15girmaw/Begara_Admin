import React, { useState, useEffect } from 'react';

function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBrokers, setTotalBrokers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    // Fetch the dashboard data from the server
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Make an API call to fetch the dashboard data
      const response = await fetch('http://localhost:3000/api/home'); // Replace with your API endpoint
      const data = await response.json();

      // Update the state variables with the retrieved data
      setTotalUsers(data.totalUsers);
      setTotalBrokers(data.totalBrokers);
      setTotalAdmins(data.totalAdmins);
    } catch (error) {
      console.error(error);
    }
  }

  const styles = `
    .dashboard-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .dashboard-box {
      width: 220px;
      height: 100px;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgb(246, 209, 25);
      
    }
    
    .box-content {
      text-align: center;
    }
    
    h2 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    p {
      font-size: 24px;
      font-weight: bold;
    
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <div className="box-content">
            <h2>Total Users</h2>
            <p id="totalUsers">{totalUsers}</p>
          </div>
        </div>

        <div className="dashboard-box">
          <div className="box-content">
            <h2>Total Brokers</h2>
            <p id="totalBrokers">{totalBrokers}</p>
          </div>
        </div>

        <div className="dashboard-box">
          <div className="box-content">
            <h2>Total Admins</h2>
            <p id="totalAdmins">{totalAdmins}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;