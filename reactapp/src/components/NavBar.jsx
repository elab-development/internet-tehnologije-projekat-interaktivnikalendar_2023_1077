import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext, getUserField} from './AuthContext';

function NavBar({ loggedInUser, onLogout, isAdmin}) {
  return (
    <div className="navBar">
      <Link to="/">Interaktivni kalendar</Link>
      <Link to="/calendar">Kalendar</Link>
      <Link to="/events">Događaji</Link>
      <Link to="/users">Korisnici</Link>
      {loggedInUser && (
        <Link to="/lokacije">Lokacije</Link>
      )}

      {loggedInUser && (
        <button className='login-button' onClick={onLogout}>Odjavi se</button>
      )}
      {!loggedInUser && (
        <Link to="/">Login</Link>
      )}
    </div>
  );
}

export default NavBar;
