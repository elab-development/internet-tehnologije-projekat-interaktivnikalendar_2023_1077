import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ loggedInUser, onLogout }) {
  return (
    <div className="navBar">
      <Link to="/">Interaktivni kalendar</Link>
      <Link to="/calendar">Kalendar</Link>
      <Link to="/events">Događaji</Link>
      <Link to="/users">Korisnici</Link>

      {loggedInUser && (
        <button className='login-button' onClick={onLogout}>Odjavi se</button>
      )}
      {!loggedInUser && (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default NavBar;
