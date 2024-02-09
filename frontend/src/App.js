import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './components/EventContext';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Events from './components/Events';
import Form from './components/Form';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import Lokacije from './components/Lokacije';
import { useAuthContext, getToken } from './components/AuthContext';
import { LocationProvider } from './components/LocationContext';

function App() {
  const { user, login } = useAuthContext();
  const handleDateClick = (date) => {
    console.log('Clicked on date:', date);
  };
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);

  const handleLogin = (userResponse) => {
    let userData = userResponse.User
    userData.token = userResponse.Token
    setLoggedInUser(userData);

    let sessionData = JSON.stringify(userData)
    window.sessionStorage.setItem("userData", sessionData)
    axios.defaults.headers.common['Authorization'] = `Bearer: ${getToken()}`
    window.location.href="/"
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    window.sessionStorage.removeItem("userData");
    axios.defaults.headers.common['Authorization'] = null
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      console.log(updatedEvents);
      return updatedEvents;
    });
  };

  let userData = window.sessionStorage.getItem("userData")
  if (!loggedInUser && userData) {
    setLoggedInUser(userData)
    axios.defaults.headers.common['Authorization'] = `Bearer: ${getToken()}`
  }

  return (
    <EventProvider>
       <LocationProvider>
      <div className="App">
        <NavBar loggedInUser={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Calendar onDateClick={handleDateClick} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/calendar" element={<Calendar onDateClick={handleDateClick} />} />
          <Route path="/login" element={!loggedInUser ? (<Login />) : (<Navigate to="/" />)} />
          <Route path="/events" element={<Events events={events} />} />
          <Route path="/form" element={<Form onAddEvent={handleAddEvent} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/lokacije" element={loggedInUser ? (<Lokacije />) : ("")} />
          <Route path="/users/:userId" element={<UserProfile />} />
        </Routes>
      </div>
      </LocationProvider>
    </EventProvider>
  );
}

export default App;
