import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { EventProvider, useEventContext } from '../components/EventContext';

const Form = ({ date, onClose, isAdminProp, existingLocations }) => {
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
    setExistingLocation(existingLocations && existingLocations.find(loc => loc.naziv === eventLocation));
  }, [existingLocations, eventLocation]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleSave = async () => {
    console.log('isAdmin is true:', isAdmin);
    try {
      let locationAdded = false;
  
      if (isAdmin) {
        const responseLocation = await axios.post('http://localhost:8000/api/lokacije', {
          naziv: eventLocation,
          adresa: eventAddress,
          grad: eventCity,
          drzava: eventCountry,
          poštanski_kod: eventPostalCode,
        });
  
        if (responseLocation.data.success) {
          locationAdded = true;
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
          console.log(isAdmin);
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
    try {
      const token = window.sessionStorage.getItem("TokenLogin");
      
      if (!existingLocation) {
        throw new Error('Existing location is not defined');
      }
  
      const responseUpdate = await axios.put(`http://localhost:8000/api/lokacije/${existingLocation.id}`, {
        naziv: eventLocation,
        adresa: eventAddress,
        grad: eventCity,
        drzava: eventCountry,
        poštanski_kod: eventPostalCode,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (responseUpdate.data.success) {
        alert('Uspešno ažurirana lokacija!');
      } else {
        alert('Greška prilikom ažuriranja lokacije!');
      }
    } catch (error) {
      console.error('Error updating location:', error);
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
        <br/>
        <input className='form-input' type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
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
