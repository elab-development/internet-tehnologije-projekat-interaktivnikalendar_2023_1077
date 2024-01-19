import React, { useState } from 'react';

const Form = ({ date, onClose, onAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleSave = () => {
    if (eventTitle && eventTime && eventDescription) {
      const newEvent = {
        date,
        title: eventTitle,
        time: eventTime,
        description: eventDescription,
      };
      onAddEvent(newEvent);
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
      <div>
        <label>Naziv:</label>
        <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      </div>
      <div>
        <label>Vreme:</label>
        <input type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
      </div>
      <div>
        <label>Opis:</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
      </div>
      <div className="form-buttons">
        <button onClick={handleSave}>Sačuvaj</button>
        <button onClick={handleCancel}>Odustani</button>
      </div>
    </div>
  );
};

export default Form;
