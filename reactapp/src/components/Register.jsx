import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegistration, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/register", { name, email, password })
      .then((res) => {
        console.log(res.data);
        if (onRegistration) {
          onRegistration(res.data.User);
        }
      })
      .catch((error) => {
        console.log("Greska pri registraciji:", error.response.data);
      });

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form>
        <label>
          Ime:
          <input className='login-input' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
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
        <button className='login-button' onClick={handleRegistration}>Registruj se</button><br/><br/>
        <p onClick={onCancel} style={{ cursor: 'pointer', color: '#30869e' }}>Odustani</p>
      </form>
    </div>
  );
};

export default Register;
