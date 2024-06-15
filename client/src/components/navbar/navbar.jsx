import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/local";
import { getUserData } from "../../utils/fetch"; 

import "./navbar.css";
import Register from "../../pages/register/Register";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false); 
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    const {data} = await getUserData();
    console.log("data", data);
    if (data && data.role) {
      setUserRole(data.role);
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/products');
  };

  const handleLoginClick = () => {
    setShowLoginForm(true); 
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false); 
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <div className="nav-links">
            <li><NavLink to="/products">Logo TechNode-express</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            {isLoggedIn && (
              <>
                <li><NavLink to="/cart">Cart</NavLink></li>
                <li><NavLink to="/favorites">Favorites</NavLink></li>
              </>
            )}
            {userRole === "admin" && <li><NavLink to="/admin">Admin</NavLink></li>}
          </div>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><button className="login-button" onClick={handleLoginClick}>Login</button></li>
            )}
          </div>
        </ul>
      </nav>
      {showLoginForm && (
        <div className="login-overlay">
          <Register onLogin={fetchUserData} onClose={handleLoginFormClose} /> 
        </div>
      )}
    </div>
  );
};

export default NavBar;
