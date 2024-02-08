import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { useLocationContext } from './LocationContext';
import { useEventContext } from '../components/EventContext';

const Form = ({ date, onClose, isAdminProp, locations}) => {
  const { user } = useAuthContext(); 
  const { addEvent } = useEventContext();
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  // Polja za admina
  const [existingLocation, setExistingLocation] = useState(null);
  const [eventAddress, setEventAddress] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventCountry, setEventCountry] = useState('');
  const [eventPostalCode, setEventPostalCode] = useState('');

  const [isAdmin, setIsAdmin] = useState((user && user.isAdmin) || isAdminProp);

  useEffect(() => {
    setIsAdmin((user && user.isAdmin) || isAdminProp);
  }, [isAdminProp, user && user.isAdmin]);

  useEffect(() => {
    if (locations.length > 0) {
      setEventLocation(locations[0].naziv);
    }
  }, [locations]);

  useEffect(() => {
    setExistingLocation(locations.find(loc => loc.naziv === eventLocation)); 
  }, [locations, eventLocation]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleSave = async () => {
    try {
      const newEvent = {
        naziv: eventTitle,
        opis: eventDescription,
        datum: formatDate(date),
        lokacija_id: eventLocation.id, // Pretpostavka: lokacija ima svoj ID
      };
  
      const response = await axios.post('http://localhost:8000/api/dogadjaji', newEvent);
  
      if (response.data.success) {
        addEvent(newEvent);
        onClose();
        alert('Događaj je uspešno sačuvan!');
      } else {
        alert('Došlo je do greške prilikom čuvanja događaja!');
      }
    } catch (error) {
      console.error('Greška prilikom komunikacije sa serverom:', error);
      alert('Greška prilikom komunikacije sa serverom');
    }
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <div className="form-container">
      <h3>Dodaj događaj na dan {formatDate(date)}</h3>
      <br/>
      <div>
        <label>Naziv:</label>
        <br/>
        <input className='form-input' type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Vreme:</label>
        <br/>
        <input className='form-input' type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Lokacija:</label>
        <br />
        <select value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}>
          <option value="">Izaberite lokaciju...</option>
          {locations.map((location, index) => (
            <option key={index} value={location.naziv}>{location.naziv}</option> // Promijenjeno
          ))}
        </select>
      </div>

      {/*forma za sve korisnike */}
      <br/>
      <div className="form-buttons">
        <button onClick={handleSave}>Sačuvaj</button>
        <button onClick={handleCancel}>Odustani</button>
      </div>
      <br/>
    </div>
  );
};

export default Form;
