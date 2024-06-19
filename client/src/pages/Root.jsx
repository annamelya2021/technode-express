import "./Root.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/local";
import { useEffect, useContext, useState } from "react";
import UserContext from "../context/userContext";
import { getUserData } from "../utils/fetch";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Importamos el icono de login

import Home from "./Home/Home";

import imageAna from '../assets/ana.jpg';
import imageMikel from '../assets/mikelondrio.png';
import imageNatxo from '../assets/natxo.png';

const year = new Date().getFullYear();
const creators = [
    { id: 1, name: 'Anna', avatar: imageAna, url: 'https://github.com/annamelya2021' },
    { id: 2, name: 'Mikel', avatar: imageMikel, url: 'https://github.com/Mikelondrio' },
    { id: 3, name: 'Natxo', avatar: imageNatxo, url: 'https://github.com/ignaciochagar' },
];

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Root = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (getToken()) {
            fetchUserData();
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    async function fetchUserData() {
        const data = await getUserData();
        if (data.error) {
            navigate("/register");
        }
        setUser(data.data);
        setRole(data.data.role);
    }

    const handleAuthClick = () => {
        if (isLoggedIn) {
            // Handle logout logic
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
            setRole(null);
            navigate("/products");
        } else {
            // Navigate to login/register page
            navigate("/register");
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-title">
                    <h1>Technode-Express</h1>
                </div>
                <div className="navbar-content">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        {role === "user" && (
                            <>
                                <li>
                                    <Link to="/carts">Cart</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                            </>
                        )}
                        {role === "admin" && (
                            <li>
                                <Link to="/admin">Admin Panel</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="navbar-icons">
                    <button onClick={handleAuthClick} className="auth-button" title={isLoggedIn ? "Logout" : "Login"}>
                        {isLoggedIn ? <p>LogOut <FaSignOutAlt /></p> : <p>LogIn <FaSignInAlt /></p>}
                    </button>
                </div>
            </nav>
            
            <div>
                <Outlet />
                
            </div>

            <footer className="footer">
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </button>
                <div className="copyright">&copy; {year} Technode - Express</div>
                <div className="creators">
                    {creators.map(creator => (
                        <a key={creator.id} href={creator.url} target="_blank" rel="noopener noreferrer" className="creator-link">
                            <div className="creator">
                                <img src={creator.avatar} alt={creator.name} className="creator-avatar" />
                                <span className="creator-name">{creator.name}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </footer>
        </>
    );
};

export default Root;
