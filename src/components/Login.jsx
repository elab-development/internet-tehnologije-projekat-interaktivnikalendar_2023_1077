import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    console.log('Logging in as:', username);

    if (onLogin) {
      onLogin(username);
    }

    setShowForgotPassword(true);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form > 
        <label>
          Username: 
          <input className='login-input' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Lozinka: 
          <input className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className='login-button' onClick={handleLogin}>Uloguj se</button>
        <br /><br />
        <p onClick={handleForgotPassword} style={{ cursor: 'pointer', color: '#30869e' }}>Zaboravljena lozinka?</p><br />
      </form>
      {showForgotPassword && <ForgotPassword onCancel={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default Login;
