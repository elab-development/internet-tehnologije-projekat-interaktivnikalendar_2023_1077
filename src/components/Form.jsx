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
    } else {
      alert('Molimo popunite sva polja!');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="form-container">
      <h3>Dodaj dogadjaj na dan {formatDate(date)}</h3>
      <div>
        <label>Title:</label>
        <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      </div>
      <div>
        <label>Time:</label>
        <input type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
      </div>
      <div className="form-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Form;
