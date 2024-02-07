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
  const [izmenaLokacije, setIzmenaLokacije] = useState(null);

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
      const token = window.sessionStorage.getItem("TokenLogin");
  
      const response = await axios.post('http://localhost:8000/api/lokacije', novaLokacija, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      
      if (response.status === 200) {
        alert('Uspešno dodata nova lokacija!');
        fetchLokacije();
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

  const handleIzmeniLokaciju = (lokacija) => {
    setIzmenaLokacije(lokacija);
  };

  const handleSacuvajIzmene = async () => {
    try {
      const token = window.sessionStorage.getItem("TokenLogin");
  
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
    <div>
      <h2>Lokacije</h2>
      <div>
        <h3>Dodaj lokaciju</h3>
        <form onSubmit={handleAddLocation}>
          <input type="text" className='form-input' name="naziv" value={novaLokacija.naziv} onChange={handleInputChange} placeholder="Naziv" />
          <input type="text" className='form-input' name="adresa" value={novaLokacija.adresa} onChange={handleInputChange} placeholder="Adresa" />
          <input type="text" className='form-input' name="grad" value={novaLokacija.grad} onChange={handleInputChange} placeholder="Grad" />
          <input type="text" className='form-input' name="drzava" value={novaLokacija.drzava} onChange={handleInputChange} placeholder="Država" />
          <input type="text" className='form-input' name="poštanski_kod" value={novaLokacija.poštanski_kod} onChange={handleInputChange} placeholder="Poštanski kod" />
          <div className="form-buttons"><button type="submit">Dodaj</button></div>
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
            {izmenaLokacije && izmenaLokacije.id === lokacija.id ? (
              <div>
                <input type="text" className='form-input' name="naziv" value={izmenaLokacije.naziv} onChange={handleInputChange} placeholder="Naziv" />
                <input type="text" className='form-input' name="adresa" value={izmenaLokacije.adresa} onChange={handleInputChange} placeholder="Adresa" />
                <input type="text" className='form-input' name="grad" value={izmenaLokacije.grad} onChange={handleInputChange} placeholder="Grad" />
                <input type="text" className='form-input' name="drzava" value={izmenaLokacije.drzava} onChange={handleInputChange} placeholder="Država" />
                <input type="text" className='form-input' name="poštanski_kod" value={izmenaLokacije.poštanski_kod} onChange={handleInputChange} placeholder="Poštanski kod" />
                <div className="form-buttons">
                  <button onClick={handleSacuvajIzmene}>Sačuvaj izmene</button>
                  <button onClick={() => setIzmenaLokacije(null)}>Odustani</button>
                </div>
              </div>
            ) : (
              <div className="form-buttons">
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
