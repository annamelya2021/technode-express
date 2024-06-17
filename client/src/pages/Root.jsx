
import "./Root.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/local";
import { useEffect, useContext, useState } from "react";
import UserContext from "../context/userContext";
import { getUserData, getCartOpened } from "../utils/fetch"; // Asegúrate de importar getCartOpened
import { FaSignOutAlt } from "react-icons/fa";

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

    useEffect(() => {
        if (!getToken()) {
            navigate("/register");
        }
        fetchUserData();
    }, []);

    async function fetchUserData() {
        const data = await getUserData();
        if (data.error) {
            navigate("/register");
        }
        setUser(data.data);
    }

 

    return (
        <>

            <nav className="navbar">
                <div className="navbar-title">
                    <h1>Technode-Express</h1>
                </div>
                <div className="navbar-content">

                    <ul >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/register">Login / Register</Link>
                        </li>
                        <li>
                            <Link to="/carts">Cart</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-icons">
                    <Link to="/register" className="icon" title="Logout">
                        <FaSignOutAlt />
                    </Link>
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



    )
};

export default Root
