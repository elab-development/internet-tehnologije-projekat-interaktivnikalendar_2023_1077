import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocationContext } from './LocationContext';
import { getToken } from './AuthContext';

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Lokacije = ({ onSelectLocation }) => {
  const { locations, addLocation} = useLocationContext();
  const [lokacije, setLokacije] = useState([]);
  const [novaLokacija, setNovaLokacija] = useState({
    naziv: '',
    adresa: '',
    grad: '',
    drzava: '',
    poštanski_kod: ''
  });
  const [izmenaLokacije, setIzmenaLokacije] = useState(null);

  useEffect(() => {
    fetchLokacije();
  }, []);

  const fetchLokacije = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/lokacije?id=1',
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
      );
      const fetchedLocations = response.data.lokacije;
      fetchedLocations.forEach(location => addLocation(location));
    setLokacije(fetchedLocations);
    } catch (error) {
      console.error('Greška prilikom dohvatanja lokacija:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (izmenaLokacije) {
      setIzmenaLokacije({
        ...izmenaLokacije,
        [name]: value
      });
    } else {
      setNovaLokacija((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault(); 
   
    try {
      const token = getToken();
  
      const response = await axios.post('http://localhost:8000/api/lokacije', novaLokacija, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      
      if (response.status === 200) {
        alert('Uspešno dodata nova lokacija!');
        fetchLokacije();
        addLocation(novaLokacija);
        setNovaLokacija({
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
      alert('Greška prilikom komunikacije sa serverom. Samo admin moze da doda, izmeni i briše lokacije.');
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

  const handleIzmeniLokaciju = (lokacija) => {
    setIzmenaLokacije(lokacija);
  };

  const handleSacuvajIzmene = async () => {
    try {
      const token = getToken();
  
      const response = await axios.put(`http://localhost:8000/api/lokacije/${izmenaLokacije.id}`, izmenaLokacije, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        alert('Uspešno izmenjena lokacija!');
        fetchLokacije();
        setIzmenaLokacije(null);
      } else {
        alert('Izmena lokacije nije uspela.');
      }
    } catch (error) {
      console.error('Greška prilikom komunikacije sa serverom:', error);
      alert('Greška prilikom komunikacije sa serverom');
    }
  };

  return (
    <div class="location-container">
  <h2>Lokacije</h2>
  <div class="add-location-container">
    <h3>Dodaj lokaciju</h3>
    <form onSubmit={handleAddLocation}>
      <input type="text" name="naziv" value={novaLokacija.naziv} onChange={handleInputChange} placeholder="Naziv" />
      <input type="text" name="adresa" value={novaLokacija.adresa} onChange={handleInputChange} placeholder="Adresa" />
      <input type="text" name="grad" value={novaLokacija.grad} onChange={handleInputChange} placeholder="Grad" />
      <input type="text" name="drzava" value={novaLokacija.drzava} onChange={handleInputChange} placeholder="Država" />
      <input type="text" name="poštanski_kod" value={novaLokacija.poštanski_kod} onChange={handleInputChange} placeholder="Poštanski kod" />
      <div><button type="submit">Dodaj</button></div>
    </form>
  </div>
  <ul class="location-list">
    {lokacije.map((lokacija) => (
    <li key={lokacija.id}>
      <p>Naziv: {lokacija.naziv}</p>
      <p>Adresa: {lokacija.adresa}</p>
      <p>Grad: {lokacija.grad}</p>
      <p>Država: {lokacija.drzava}</p>
      <p>Poštanski kod: {lokacija.poštanski_kod}</p>
      {izmenaLokacije && izmenaLokacije.id === lokacija.id ? (
        <div className="edit-location-form">
          <input type="text" name="naziv" value={izmenaLokacije.naziv} onChange={handleInputChange} placeholder="Naziv" />
          <input type="text" name="adresa" value={izmenaLokacije.adresa} onChange={handleInputChange} placeholder="Adresa" />
          <input type="text" name="grad" value={izmenaLokacije.grad} onChange={handleInputChange} placeholder="Grad" />
          <input type="text" name="drzava" value={izmenaLokacije.drzava} onChange={handleInputChange} placeholder="Država" />
          <input type="text" name="poštanski_kod" value={izmenaLokacije.poštanski_kod} onChange={handleInputChange} placeholder="Poštanski kod" />
          <div>
            <button onClick={handleSacuvajIzmene}>Sačuvaj izmene</button>
            <button onClick={() => setIzmenaLokacije(null)}>Odustani</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => handleIzmeniLokaciju(lokacija)}>Izmeni</button>
          <button onClick={() => handleIzbrisiLokaciju(lokacija.id)}>Izbriši</button>
        </div>
      )}
    </li>
    ))}
  </ul>
</div>

  );
};

export default Lokacije;
