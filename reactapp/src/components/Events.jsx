import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext(); // Dobijamo korisničke informacije iz konteksta autentifikacije

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/dogadjaji?user_id=${user.id}`);
        const eventData = response.data.data; // Pridruživanje niza događaja pod ključem 'data'
        setEvents(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dohvatanja događaja:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  if (loading) {
    return <div>Učitavanje događaja...</div>;
  }

  if (!events || events.length === 0) {
    return <div>Nema sačuvanih događaja.</div>;
  }

  if (!Array.isArray(events)) {
    console.error('Podaci o događajima nisu u očekivanom formatu:', events);
    return <div>Podaci o događajima nisu u očekivanom formatu.</div>;
  }
  
  return (
    <div className='events-container'>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '5px' }}>
            <div>Datum: {formatDate(new Date(event.datum))}</div>
            <div>Naziv: {event.naziv}</div>
            <div>Opis: {event.opis}</div>
            <div>Lokacija: {event.lokacija_id.naziv}</div>

          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default Events;
