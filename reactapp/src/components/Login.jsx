import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import axios from 'axios';
import Register from './Register';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login", { email, password })
      .then((res) => {
        console.log(res.data);
        if (onLogin) {
          onLogin(res.data);
        }
        if(res.data.success === true){
          window.sessionStorage.setItem("auth_token", res.data.token);
        }
      })
      .catch((error) => {
        console.log("Greska pri logovanju:", error.response.data);
      });
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleRegistration = () => {
    setShowRegistration(true);
  };
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Lozinka:
          <input className='login-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className='login-button' onClick={handleLogin}>Uloguj se</button>
        <br /><br />
        <p onClick={handleRegistration} style={{ cursor: 'pointer', color: '#30869e' }}>Registruj se</p>   
        <p onClick={handleForgotPassword} style={{ cursor: 'pointer', color: '#30869e' }}>Zaboravljena lozinka?</p><br />
      </form>
      {showRegistration && <Register onCancel={() => setShowRegistration(false)} />}
      {showForgotPassword && <ForgotPassword onCancel={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default Login;
