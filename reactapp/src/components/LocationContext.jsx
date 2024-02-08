import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (!context) {
      throw new Error('useLocationContext must be used within a LocationProvider');
    }
    return context;
  };

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  const addLocation = (location) => {
    setLocations((prevLocations) => [...prevLocations, location]);
  };
  return (
    <LocationContext.Provider value={{ locations, addLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
