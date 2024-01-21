import React, { useState } from 'react';

const ForgotPassword = ({ onCancel }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Password reset requested for email:', email);
    
    if (onCancel) {
      onCancel();
    }
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
        <button className='login-button' onClick={handleResetPassword}>Resetuj lozinku</button>
        <br /><br />
        <p onClick={onCancel} style={{ cursor: 'pointer', color: '#30869e' }}>Odustani</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
