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
      <h2>Forgot Password</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
        <br />
        <p onClick={onCancel} style={{ cursor: 'pointer', color: 'blue' }}>Cancel</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
