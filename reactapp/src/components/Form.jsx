import React, { useState } from 'react';
import { useEventContext } from '../components/EventContext';
import Combobox from '../components/Combobox';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


let alertWhenSelected = () => alert('selected!');
let alertWhenChanged = () => alert('changed!');




const Form = ({ date, onClose}) => {
  const { addEvent } = useEventContext();
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const eventOptions = ['Posao', 'Rodjendani', 'Sastanci'];

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

  const handleSave = () => {
    if (eventTitle && eventTime && eventDescription && eventLocation) {
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
      alert('Molimo popunite sva polja!');
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
      <div>
        <label>Opis:</label>    
          <br/>
        <textarea className='form-input' value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Odabir događaja:</label>
        <br />
        <select
          className='form-input'
          onChange={(e) => setSelectedEvent(e.target.value)}
          value={selectedEvent}
        >
          <option value="" disabled>
            Odaberite događaj
          </option>
          {eventOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        </div>


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
