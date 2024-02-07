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
  const [novaLokacija, setNovaLokacija] = useState({
    naziv: '',
    adresa: '',
    grad: '',
    drzava: '',
    poštanski_kod: ''
  });

  useEffect(() => {
    fetchLokacije();
  }, []);

  const fetchLokacije = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/lokacije');
      setLokacije(response.data.lokacije);
    } catch (error) {
      console.error('Greška prilikom dohvatanja lokacija:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaLokacija((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddLocation = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const token = window.sessionStorage.getItem("TokenLogin");
  
      const response = await axios.post('http://localhost:8000/api/lokacije', novaLokacija, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Proveri odgovor servera
      if (response.status === 200) {
        alert('Uspešno dodata nova lokacija!');
        fetchLokacije(); // Ažuriraj prikaz lokacija nakon dodavanja nove
        setNovaLokacija({ // Resetuj formu nakon uspešnog dodavanja
          naziv: '',
          adresa: '',
          grad: '',
          drzava: '',
          poštanski_kod: ''
        });
      } else {
        alert('Dodavanje nove lokacije nije uspelo.');
      }
    } catch (error) {
      console.error('Greška prilikom komunikacije sa serverom:', error);
      alert('Greška prilikom komunikacije sa serverom');
    }
  };

  const handleIzbrisiLokaciju = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/lokacije/${id}`);
      fetchLokacije();
    } catch (error) {
      console.error('Greška prilikom brisanja lokacije:', error);
    }
  };

  return (
    <div>
      <h2>Lokacije</h2>
      <div>
        <h3>Dodaj lokaciju</h3>
        <form onSubmit={handleAddLocation}>
          <input type="text" name="naziv" value={novaLokacija.naziv} onChange={handleInputChange} placeholder="Naziv" />
          <input type="text" name="adresa" value={novaLokacija.adresa} onChange={handleInputChange} placeholder="Adresa" />
          <input type="text" name="grad" value={novaLokacija.grad} onChange={handleInputChange} placeholder="Grad" />
          <input type="text" name="drzava" value={novaLokacija.drzava} onChange={handleInputChange} placeholder="Država" />
          <input type="text" name="poštanski_kod" value={novaLokacija.poštanski_kod} onChange={handleInputChange} placeholder="Poštanski kod" />
          <button type="submit">Dodaj</button>
        </form>
      </div>
      <ul>
        {lokacije.map((lokacija) => (
          <li key={lokacija.id}>
            <p>Naziv: {lokacija.naziv}</p>
            <p>Adresa: {lokacija.adresa}</p>
            <p>Grad: {lokacija.grad}</p>
            <p>Država: {lokacija.drzava}</p>
            <p>Poštanski kod: {lokacija.poštanski_kod}</p>
            <button onClick={() => handleIzbrisiLokaciju(lokacija.id)}>Izbriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lokacije;
