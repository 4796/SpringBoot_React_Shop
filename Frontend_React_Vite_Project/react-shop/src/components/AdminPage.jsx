import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    username: '',
    password: '',
    name: '',
    city: '',
    phone_number: '',
    pay: ''
  });
  const [error, setError] = useState('');
  
  const username = sessionStorage.getItem('username');
  const url = new URL('http://localhost:8080/worker/all');

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (username) url.searchParams.set('username1', username);
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkers(data);
      }
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/worker/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newWorker)
      });

      if (response.ok) {
        setNewWorker({
          username: '',
          password: '',
          name: '',
          city: '',
          phone_number: '',
          pay: ''
        });
        fetchWorkers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add worker. Please try again.');
      }
    } catch (error) {
      console.error('Error adding worker:', error);
      setError('Failed to add worker. Please try again.');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto 20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  };

  const formRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const labelStyle = {
    width: '180px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white'
  };

  const inputStyle = {
    flex: '1',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  };

  const workersListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  const workerCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px'
  };

  const errorStyle = {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '14px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Worker</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleAddWorker} style={formStyle}>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's name:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter worker's name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's username:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter worker's username"
            value={newWorker.username}
            onChange={(e) => setNewWorker({...newWorker, username: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's password:</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter worker's password"
            value={newWorker.password}
            onChange={(e) => setNewWorker({...newWorker, password: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's city:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter worker's city"
            value={newWorker.city}
            onChange={(e) => setNewWorker({...newWorker, city: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's phone number:</label>
          <input
            style={inputStyle}
            type="tel"
            placeholder="Enter worker's phone number"
            value={newWorker.phone_number}
            onChange={(e) => setNewWorker({...newWorker, phone_number: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Enter worker's pay:</label>
          <input
            style={inputStyle}
            type="number"
            step="0.01"
            placeholder="Enter worker's pay"
            value={newWorker.pay}
            onChange={(e) => setNewWorker({...newWorker, pay: e.target.value})}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Worker
        </button>
      </form>

      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>Workers List</h2>
      <div style={workersListStyle}>
        {workers.map((worker, index) => (
          <div key={index} style={workerCardStyle}>
            <p><strong>Name:</strong> {worker.name}</p>
            <p><strong>Username:</strong> {worker.username}</p>
            <p><strong>City:</strong> {worker.city}</p>
            <p><strong>Phone:</strong> {worker.phone_number}</p>
            <p><strong>Pay:</strong> {worker.pay}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;