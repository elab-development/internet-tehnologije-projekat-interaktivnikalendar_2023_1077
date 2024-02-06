import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { useEventContext } from '../components/EventContext';

const Form = ({ date, onClose, isAdminProp, existingLocations }) => {
  const { user, setUser } = useAuthContext();
  const { addEvent } = useEventContext();
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  // Polja za admina
  const [eventAddress, setEventAddress] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventCountry, setEventCountry] = useState('');
  const [eventPostalCode, setEventPostalCode] = useState('');

  // Dodaj isAdmin u lokalno stanje komponente
  const [isAdmin, setIsAdmin] = useState(isAdminProp);

  useEffect(() => {
    setIsAdmin(isAdminProp);
  }, [isAdminProp]);

  const handleChange = (e) => {
    setEventTitle(e.target.value);
  };

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
      if (isAdmin) {
        const response = await axios.post('http://localhost:8000/api/lokacije', {
          naziv: eventLocation,
          adresa: eventAddress,
          grad: eventCity,
          drzava: eventCountry,
          'poštanski_kod': eventPostalCode,
        });

        if (response.data.success) {
          const newEvent = {
            date,
            title: eventTitle,
            time: eventTime,
            description: eventDescription,
            location: eventLocation,
            selectedEvent,
          };
          addEvent(newEvent);
          onClose();
          alert('Događaj je sačuvan!');
        } else {
          alert('Greška prilikom kreiranja/izmene lokacije!');
        }
      } else {
        const existingLocation = existingLocations.find(loc => loc.naziv === eventLocation);

        if (existingLocation) {
          const newEvent = {
            date,
            title: eventTitle,
            time: eventTime,
            description: eventDescription,
            location: eventLocation,
            selectedEvent,
          };

          await axios.post('http://localhost:8000/api/dogadjaji', newEvent);

          addEvent(newEvent);
          onClose();
          alert('Događaj je sačuvan!');
        } else {
          alert('Unesena lokacija ne postoji. Samo admin može kreirati/izmeniti nove lokacije!');
        }
      }
    } catch (error) {
      console.error('Error creating/updating location or event:', error);
      alert('Greška prilikom komunikacije sa serverom');
    }
  };

  const handleUpdateLocation = async () => {
    // Implementiraj logiku za izmenu postojeće lokacije
  };

  const handleDeleteLocation = async () => {
    // Implementiraj logiku za brisanje postojeće lokacije
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="form-container">
      <h3>Dodaj događaj na dan {formatDate(date)}</h3>
      <br/>
      {isAdmin && (
        <>
          <div>
            <label>Naziv lokacije:</label>
            <br/>
            <input className='form-input' type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
          </div>
          <br/>
          <div>
            <label>Adresa lokacije:</label>
            <br/>
            <input className='form-input' type="text" value={eventAddress} onChange={(e) => setEventAddress(e.target.value)} />
          </div>
          <br/>
          <div>
            <label>Grad lokacije:</label>
            <br/>
            <input className='form-input' type="text" value={eventCity} onChange={(e) => setEventCity(e.target.value)} />
          </div>
          <br/>
          <div>
            <label>Država lokacije:</label>
            <br/>
            <input className='form-input' type="text" value={eventCountry} onChange={(e) => setEventCountry(e.target.value)} />
          </div>
          <br/>
          <div>
            <label>Poštanski kod lokacije:</label>
            <br/>
            <input className='form-input' type="text" value={eventPostalCode} onChange={(e) => setEventPostalCode(e.target.value)} />
          </div>
          <br/>
          <button onClick={handleUpdateLocation}>Izmeni lokaciju</button>
          <button onClick={handleDeleteLocation}>Obriši lokaciju</button>
        </>
      )}
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
        <br/>
        <input className='form-input' type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
      </div>
      {/* ... ostatak forme za sve korisnike ... */}
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
