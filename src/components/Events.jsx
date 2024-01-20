import React, { useState } from 'react';
import { useEventContext } from '../components/EventContext';

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
const Events = () => {
const [exportedEvents, setExportedEvents] = useState([]);
  const { events } = useEventContext();
  if (!events || events.length === 0) {
    return <div>Nema sačuvanih dogadjaja.</div>;
  }
  
  const handleExport = () => {
    setExportedEvents(events);
    console.log('Exported Events:', exportedEvents);
  };
  return (
    <div>
        <button onClick={handleExport}>Preuzmi podatke</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <div>Datum: {formatDate(event.date)}</div>
            <div>Naziv: {event.title}</div>
            <div>Vreme: {event.time}</div>
            <div>Opis: {event.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
