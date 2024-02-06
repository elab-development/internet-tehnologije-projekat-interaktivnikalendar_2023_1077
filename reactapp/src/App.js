import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from './components/EventContext';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Events from './components/Events';
import Form from './components/Form';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import { useAuthContext } from './components/AuthContext';

function App() {
  const { user, login } = useAuthContext();
  const handleDateClick = (date) => {
    console.log('Clicked on date:', date);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/korisnik');
        login({ ...user, isAdmin: response.data.isAdmin });
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user, login]);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      console.log(updatedEvents);
      return updatedEvents;
    });
  };

  return (
    <EventProvider>
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
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/events" element={<Events events={events} />} />
              <Route path="/form" element={<Form onAddEvent={handleAddEvent} />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserProfile />} />
            </Routes>
          </div>
          </EventProvider>
        
  );
}

export default App;
