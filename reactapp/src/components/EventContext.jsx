// EventProvider.js
import React, { createContext, useContext } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Dodaj logiku za rad sa događajima
  const addEvent = (event) => {
    // Implementiraj dodavanje događaja
  };

  return (
    <EventContext.Provider value={{ addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};
