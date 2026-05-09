import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [messageData, setMessageData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming backend is running on port 5000
      const [msgResponse, usersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/message'),
        axios.get('http://localhost:5000/api/users')
      ]);
      
      setMessageData(msgResponse.data);
      setUsersData(usersResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to connect to the backend API. Make sure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Connect the Stack</h1>
        <p>React Frontend Connected to Express Backend</p>
      </div>

      {loading ? (
        <div className="loading">Connecting to API...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="card-grid">
          <div className="card">
            <h2>System Status</h2>
            <div className="data-item">
              <strong>Message:</strong> {messageData?.message} <br/><br/>
              <strong>Status:</strong> {messageData?.status} <br/><br/>
              <strong>Timestamp:</strong> {new Date(messageData?.timestamp).toLocaleTimeString()}
            </div>
          </div>
          
          <div className="card">
            <h2>Registered Users</h2>
            <ul className="users-list">
              {usersData?.map(user => (
                <li key={user.id}>
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  <span>{user.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button className="refresh-btn" onClick={fetchData}>
        Refresh Data
      </button>
    </div>
  );
}

export default App;
