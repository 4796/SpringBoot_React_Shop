import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateAccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: sessionStorage.getItem('username') || '',
    password: '',
    name: sessionStorage.getItem('name') || '',
    city: sessionStorage.getItem('city') || '',
    phone_number: sessionStorage.getItem('phone_number') || '',
    pay: sessionStorage.getItem('pay') || ''
  });
  const [error, setError] = useState('');

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    margin: '20px auto',
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
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const errorStyle = {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '14px'
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/worker/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('city', data.city);
        sessionStorage.setItem('phone_number', data.phone_number);
        sessionStorage.setItem('pay', data.pay);
        navigate('/worker');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update account. Please try again.');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      setError('Failed to update account. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Account</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleUpdate} style={formStyle}>
        <div style={formRowStyle}>
          <label style={labelStyle}>New Password:</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>City:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Phone Number:</label>
          <input
            style={inputStyle}
            type="tel"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Pay:</label>
          <input
            style={inputStyle}
            type="number"
            step="0.01"
            min="0"
            placeholder="Pay"
            value={formData.pay}
            onChange={(e) => setFormData({...formData, pay: e.target.value})}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <button 
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountPage;