// Navbar.jsx
import React from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="shell-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7.35 0 3.5 3.85 3.5 8.5C3.5 13.15 12 24 12 24C12 24 20.5 13.15 20.5 8.5C20.5 3.85 16.65 0 12 0ZM12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12Z" fill="#4b3621"/>
          </svg>
        </div>
        <h1 className="navbar-title">Santiagín</h1>
        <div className="shell-icon" style={{ visibility: 'hidden' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7.35 0 3.5 3.85 3.5 8.5C3.5 13.15 12 24 12 24C12 24 20.5 13.15 20.5 8.5C20.5 3.85 16.65 0 12 0ZM12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12Z" fill="#4b3621"/>
          </svg>
        </div>
      </div>
      <div className="navbar-icons">
        <button onClick={() => onViewChange('map')} className="icon" title="Mapa">
          Mapa
        </button>
        <button onClick={() => onViewChange('register')} className="icon" title="Registro de Alojamientos">
          Registro
        </button>
        <button onClick={() => onViewChange('grid')} className="icon" title="Tarjetas de Alojamientos">
          Albergues
        </button>
        <FaSignOutAlt className="icon" title="Logout" />
      </div>
    </nav>
  );
};

export default Navbar;