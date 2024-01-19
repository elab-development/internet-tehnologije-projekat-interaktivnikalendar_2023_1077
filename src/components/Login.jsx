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
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username: 
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password: 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
        <br />
        <p onClick={handleForgotPassword} style={{ cursor: 'pointer', color: 'blue' }}>Zaboravljena lozinka?</p>
      </form>
      {showForgotPassword && <ForgotPassword onCancel={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default Login;
