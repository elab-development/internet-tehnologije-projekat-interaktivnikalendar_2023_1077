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

  const addLocation = (newLocation) => {
    setLocations((prevLocations) => {
      const isLocationExist = prevLocations.some(location => location.id === newLocation.id);
      if (!isLocationExist) {
        return [...prevLocations, newLocation];
      } else {
        return prevLocations.map(location => location.id === newLocation.id ? newLocation : location);
      }
    });
  };
  

  const removeLocation = (locationId) => {
    setLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
  };

  return (
    <LocationContext.Provider value={{ locations, addLocation, removeLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
