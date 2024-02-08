import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserObject, getToken } from './AuthContext';
import { useLocationContext } from './LocationContext';
import { useEventContext } from '../components/EventContext';

const Form = ({ date, onClose, isAdminProp, locations }) => {
  
  const { addEvent } = useEventContext();
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const user = getUserObject();
 // const [isAdmin, setIsAdmin] = useState((user && user.isAdmin) || isAdminProp);

 /* useEffect(() => {
    setIsAdmin((user && user.isAdmin) || isAdminProp);
  }, [isAdminProp, user && user.isAdmin]);*/

  useEffect(() => {
    if (locations.length > 0) {
      setEventLocation(locations[0].id || '');
    }
  }, [locations]);

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
      console.log(user)
      if (!user || !user.id) {
        alert('Korisnik nije pravilno prijavljen!');
        return;
      }
  
      if (!eventLocation) {
        alert('Lokacija nije odabrana!');
        return;
      }
  
      const formattedDate = formatDate(date);
      const formattedDateForApi = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const newEvent = {
        naziv: eventTitle,
        opis: eventDescription,
        datum: formattedDateForApi,
        lokacija_id: eventLocation, 
        user_id: user.id,
      };
      const token = getToken();
      const response = await axios.post('http://localhost:8000/api/dogadjaji', newEvent,  {
        headers: {
          Authorization: `Bearer ${token}`
        }});
  
      if (response.data && response.data[0] && response.data[0].includes('Uspešno kreiran novi dogadjaj')) {
        
        alert(response.data[0]);
        addEvent(newEvent);
        onClose();
      } else {
        
        alert('Došlo je do greške prilikom čuvanja događaja.');
      }
    } catch (error) {
      console.error('Greška prilikom komunikacije sa serverom:', error);
      alert('Došlo je do greške prilikom komunikacije sa serverom. Administrator ne može da dodaje nove događaje, samo ulogovani korisnik može!');
    }
  };
  
  

  const handleCancel = () => {
    onClose();
  };

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setEventLocation(selectedLocationId); 
  };

  return (
    <div className="form-container">
      <h3>Dodaj događaj na dan {formatDate(date)}</h3>
      <br />
      <div>
        <label>Naziv:</label>
        <br />
        <input className='form-input' type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      </div>
      <br />
      <div>
        <label>Opis:</label>
        <br />
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
      </div>
      <br />
      <div>
        <label>Lokacija:</label>
        <br />
        <select value={eventLocation} onChange={handleLocationChange}>
          <option value="">Izaberite lokaciju...</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.naziv}</option>
          ))}
        </select>
      </div>
      <br />
      <div className="form-buttons">
        <button onClick={handleSave}>Sačuvaj</button>
        <button onClick={handleCancel}>Odustani</button>
      </div>
      <br />
    </div>
  );
};

export default Form;
