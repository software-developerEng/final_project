import React from 'react';
import './styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left">
        <div className="burger-menu">&#9776;</div>
      </div>
      <div className="logo">Logo</div>
      <div className="right">
        <div className="profile-icon">Profile </div>
        <div className="settings-icon">Settings</div>
      </div>
    </nav>
  );
}

export default Navbar;
