import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("TokenLogin");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Lokacije = () => {
  const [lokacije, setLokacije] = useState([]);

  useEffect(() => {
    const fetchLokacije = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/lokacije');
        setLokacije(response.data.lokacije);
      } catch (error) {
        console.error('Greška prilikom dohvatanja lokacija:', error);
      }
    };

    fetchLokacije();
  }, []);

  return (
    <div>
      <h2>Lokacije</h2>
      <ul>
        {lokacije.map((lokacija) => (
          <li key={lokacija.id}>
            <p>Naziv: {lokacija.naziv}</p>
            <p>Adresa: {lokacija.adresa}</p>
            <p>Grad: {lokacija.grad}</p>
            <p>Država: {lokacija.drzava}</p>
            <p>Poštanski kod: {lokacija.poštanski_kod}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lokacije;
