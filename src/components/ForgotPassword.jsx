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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleResetPassword}>Resetuj lozinku</button>
        <br />
        <p onClick={onCancel} style={{ cursor: 'pointer', color: 'blue' }}>Odustani</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
