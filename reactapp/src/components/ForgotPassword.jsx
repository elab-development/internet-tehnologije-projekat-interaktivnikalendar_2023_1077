import React, { useState } from 'react';
import axios from 'axios';
import { getUserObject, getToken } from './AuthContext';

const ForgotPassword = ({ onCancel }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    const token = getToken();
    axios.post("http://127.0.0.1:8000/api/resetPassword", {
      email,
      new_password: newPassword, 
    },  {
      headers: {
        Authorization: `Bearer ${token}`
      }})
    .then((response) => {
      console.log(response.data);
      if (onCancel) {
        onCancel();
      }
    })
    .catch((error) => {
      console.error("Greška prilikom resetovanja lozinke:", error.response.data);
    });
  };

  return (
    <div>
      <h2>Zaboravljena lozinka</h2>
      <form>
        <label>
          Email:
          <input className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Nova lozinka:
          <input className='login-input' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <br />
        <button className='login-button' onClick={handleResetPassword}>Resetuj lozinku</button>
        <br /><br />
        <p onClick={onCancel} style={{ cursor: 'pointer', color: '#30869e' }}>Odustani</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
