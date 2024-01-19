import React from 'react';

function NavBar({ loggedInUser, onLogout }) {
  return (
    <div className="navBar">
      <a href="/">Interaktivni kalendar</a>
      {loggedInUser && (
        <button onClick={onLogout}>Odjavi se</button>
      )}
    </div>
  );
}

export default NavBar;
