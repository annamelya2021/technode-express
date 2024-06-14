// Navbar.jsx
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Eliminamos FaSignInAlt si no se usa
import './navbar.css';

const Navbar = ({ onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Technode-Express</h1> {/* Título de la aplicación */}
        
        {/* Barra de búsqueda */}
        <input 
          type="text" 
          className="navbar-search" 
          placeholder="Buscar..." 
          onChange={(e) => console.log(e.target.value)} // Puedes agregar lógica para manejar la búsqueda
        />

        {/* Selección de categorías */}
        <select className="navbar-categories" onChange={(e) => onViewChange(e.target.value)}>
          <option value="smarthphones">Smarthphones</option>
          <option value="tablets">Tablets</option>
          
        </select>
      </div>
      
      <div className="navbar-icons">
        {/* Mantener el icono de logout */}
        <FaSignOutAlt className="icon" title="Logout" onClick={() => onViewChange('logout')} />
      </div>
    </nav>
  );
};

export default Navbar;
