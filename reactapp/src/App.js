import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EventProvider } from './components/EventContext';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Events from './components/Events';
import Form from './components/Form';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';

function App() {
  const handleDateClick = (date) => {
    console.log('Clicked on date:', date);
  };

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
    <Router>
       <EventProvider>
      <div className="App">
        { <NavBar loggedInUser={loggedInUser} onLogout={handleLogout} />}
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
    </Router>
  );
}

export default App;