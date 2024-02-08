import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Setting user data:', userData);
    setUser((prevUser) => {
      console.log('Previous user data:', prevUser);
      return userData;
    });
  };
  
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export const getUserObject = () => {
  let userData = window.sessionStorage.getItem("userData")
  if (!userData) {
    return null;
  }

  let parsedData = JSON.parse(userData)
  return parsedData
}

export const getUserField = (field) => {
  let user = getUserObject()
  if (user && field in user) {
    return user[field]
  }
  return null
};

export const getToken = () => {
  return getUserField("token")
};