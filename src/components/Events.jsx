import React, { useState } from 'react';
import { useEventContext } from '../components/EventContext';

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
            <div>Datum: {event.date.toLocaleDateString()}</div>
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
