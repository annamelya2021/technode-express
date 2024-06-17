import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/local";
import { useEffect, useContext, useState } from "react";
import UserContext from "../context/userContext";
import { getUserData, getCartOpened } from "../utils/fetch"; // Asegúrate de importar getCartOpened
import { FaSignOutAlt } from "react-icons/fa";

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
        <div>
            <nav className="navbar">
                <div>
                    <h1 className="navbar-title">Technode-Express</h1>
                </div>
                <div className="navbar-content">
                    <ul>
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
            <Outlet />
        </div>
    );
};

export default Root;
