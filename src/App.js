import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';
import Login from './components/Login';


function App() {
  const handleDateClick = (date) => {
    console.log('Clicked on date:', date);
  };
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);

  const handleLogin = (username) => {
    setLoggedInUser(username);};

    const handleLogout = () => {
      setLoggedInUser(null);
    };

  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} onLogout={handleLogout} />
      {!loggedInUser ? (
        <Login onLogin={handleLogin} />
        ) : (
      <Calendar onDateClick={handleDateClick} />
      )}
    </div>
  );
}

export default App;