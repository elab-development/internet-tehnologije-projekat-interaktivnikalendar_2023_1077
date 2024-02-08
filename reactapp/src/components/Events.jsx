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
  const [editingEventId, setEditingEventId] = useState(null); // ID događaja koji se trenutno uređuje
  const [updatedEvent, setUpdatedEvent] = useState({}); // Stanje za čuvanje izmenjenih vrednosti događaja
  const { user } = useAuthContext(); // Dobijamo korisničke informacije iz konteksta autentifikacije

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

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/dogadjaji/${id}`);
      setEvents(events.filter((event) => event.id !== id));
      alert('Dogadjaj je uspešno obrisan!');
    } catch (error) {
      console.error('Greška prilikom brisanja događaja:', error);
      alert('Došlo je do greške prilikom brisanja događaja.');
    }
  };
  

  const formatDateForApi = (dateString) => {
    const [day, month, year] = dateString.split('/'); // Razdvajamo dan, mesec i godinu
    return `${year}-${month}-${day}`; // Pravimo novi datum u formatu "yyyy-MM-dd"
  };
  
  // U funkciji handleUpdateEvent promenite datum pre slanja na server
  const handleUpdateEvent = async (id) => {
    try {
      // Pre slanja datuma na server, promenite format datuma
      const updatedEventWithFormattedDate = {
        ...updatedEvent,
        datum: formatDateForApi(updatedEvent.datum)
      };
      await axios.put(`http://localhost:8000/api/dogadjaji/${id}`, updatedEventWithFormattedDate);
      setEditingEventId(null);
      setUpdatedEvent({});
      fetchEvents();
      alert('Dogadjaj je uspešno ažuriran!');
    } catch (error) {
      console.error('Greška prilikom izmene događaja:', error);
      alert('Došlo je do greške prilikom izmene događaja.');
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

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
  console.log(events);
  return (
    <div className='events-container'>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '5px' }}>
            {editingEventId === event.id ? ( // Ako se trenutno uređuje ovaj događaj, prikaži input polja za izmenu
              <div>
                <input
                  type='text'
                  name='naziv'
                  value={updatedEvent.naziv || event.naziv}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  name='opis'
                  value={updatedEvent.opis || event.opis}
                  onChange={handleInputChange}
                />
                <input
                  type='date'
                  name='datum'
                  value={updatedEvent.datum || formatDate(new Date(event.datum))}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleUpdateEvent(event.id)}>Sačuvaj</button>
              </div>
            ) : (
              // Inače prikaži informacije o događaju
              <div>
                <div>Datum: {formatDate(new Date(event.datum))}</div>
                <div>Naziv: {event.naziv}</div>
                <div>Opis: {event.opis}</div>
                <div>Lokacija: {event.lokacija_id.naziv}</div>
                <div>
                  <button onClick={() => setEditingEventId(event.id)}>Izmeni</button>
                  <button onClick={() => handleDeleteEvent(event.id)}>Obriši</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
