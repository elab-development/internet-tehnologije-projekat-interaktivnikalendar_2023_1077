import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserObject, getToken } from './AuthContext';

const sendNotificationEmail = async (eventId) => {
  try {
    const token = getToken();
    const response = await axios.post('http://localhost:8000/api/send-email', {
      eventId: eventId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }});
    alert('Notifikacija je uspešno poslata na vašu email adresu!');
  } catch (error) {
    console.error('Greška prilikom slanja notifikacije na email:', error);
    alert('Došlo je do greške prilikom slanja notifikacije na email.');
  }
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const formatDateGoogle = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${year}${formattedMonth}${formattedDay}/${year}${formattedMonth}${formattedDay}`;
};

const formattedDateForApi = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const Events = () => {
  const [events, setEvents] = useState([]);
  //const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const user = getUserObject();

   const fetchEvents = async () => {
    const token = getToken();
    try {
      const responseEvents = await axios.get(`http://localhost:8000/api/dogadjaji`, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      const eventData = responseEvents.data;
      setEvents(eventData.data);
        console.log(responseEvents.data.data)

      /*const responseLocations = await axios.get('http://localhost:8000/api/lokacije');
      const locationData = responseLocations.data;
      setLocations(locationData);*/

    } catch (error) {
      console.error('Greška prilikom dohvatanja događaja ili lokacija:', error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert('Korisnik nije pravilno prijavljen!');
        return;}
      const confirmDelete = window.confirm('Da li ste sigurni da želite da obrišete ovaj događaj?');
      if (!confirmDelete) {
        return;
      }
      
  
      await axios.delete(`http://localhost:8000/api/dogadjaji/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      setEvents(events.filter((event) => event.id !== id));
      alert('Događaj je uspešno obrisan!');
    } catch (error) {
      console.error('Greška prilikom brisanja događaja:', error);
      alert('Došlo je do greške prilikom brisanja događaja. Korisnik može da briše samo događaje koje je on napravio!');
    }
  };

  const handleUpdateEvent = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert('Korisnik nije pravilno prijavljen!');
        return;
      }
  
      if (user.id !== id) {
        alert('Korisnik može menjati samo svoje događaje!');
        return;
      }
  
      const updatedEventData = {
        naziv: updatedEvent.naziv,
        opis: updatedEvent.opis,
        datum: formattedDateForApi(new Date(updatedEvent.datum))
      };
  
      const response = await axios.put(`http://localhost:8000/api/dogadjaji/${id}`, updatedEventData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const updatedEvents = events.map(event => {
          if (event.id === id) {
            return {
              ...event,
              naziv: updatedEventData.naziv,
              datum: updatedEventData.datum,
              opis: updatedEventData.opis
            };
          }
          return event;
        });
        setEvents(updatedEvents);
  
        setEditingEventId(null);
        setUpdatedEvent({});
        alert('Događaj je uspešno ažuriran!');
      } else {
        alert('Izmena događaja nije uspela.');
      }
    } catch (error) {
      console.error('Greška prilikom izmene događaja:', error);
      alert('Došlo je do greške prilikom izmene događaja.');
    }
  };
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value || '' });
  };
  
  const handleExportICS = async () => {
    try {
      axios.get('http://localhost:8000/api/export', {responseType: 'blob'}).then(r => {
        // create file link in browser's memory
        const href = URL.createObjectURL(r.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'calendar.ics');
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } catch (error) {
      console.error('Greška prilikom eksportovanja .ics fajla:', error);
      alert('Došlo je do greške prilikom eksportovanja .ics fajla.');
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setUpdatedEvent({});
  };

  if (loading) {
    return <div>Učitavanje događaja...</div>;
  }

  if (!events || events.length === 0) {
    return <div>Nema sačuvanih događaja.</div>;
  }



  return (
    <div className='events-container'>
      <div className="form-buttons">
        <button onClick={handleExportICS}>Eksportuj .ics</button>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '5px' }}>
            {editingEventId === event.id ? (
              <div>
                <input className='form-input' type='text' name='naziv' value={updatedEvent.naziv || event.naziv} onChange={handleInputChange} />
                <input className='form-input' type='text' name='opis' value={updatedEvent.opis || event.opis} onChange={handleInputChange} />
                <input className='form-input' type='date' name='datum' value={updatedEvent.datum || formatDate(new Date(event.datum))} onChange={handleInputChange} />

                <div className="form-buttons"><button onClick={() => handleUpdateEvent(event.id)}>Sačuvaj</button>
                <button onClick={() => handleCancelEdit()}>Odustani</button></div>
              </div>
            ) : (
              <div>
                <div>Datum: {formatDate(new Date(event.datum))}</div>
                <div>Naziv: {event.naziv}</div>
                <div>Opis: {event.opis}</div>
                <div>Naziv lokacije: {event.lokacija_id.naziv}</div>
                <div>Kreirao korisnik: {event.user_id.name}</div>
                <div><a className="btn" target="_blank" href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${window.encodeURIComponent(event.naziv)}&location=${window.encodeURIComponent(event.lokacija_id.naziv)}&details=${window.encodeURIComponent(event.opis)}&dates=${window.encodeURIComponent(formatDateGoogle(new Date(event.datum)))}`}>Dodaj u Google kalendar</a></div>
                
                <div className="form-buttons">
                  <button onClick={() => setEditingEventId(event.id)}>Izmeni</button>
                  <button onClick={() => handleDeleteEvent(event.id)}>Obriši</button>
                  <button onClick={() => sendNotificationEmail(event.id)}>Pošalji notifikaciju na email</button>
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
