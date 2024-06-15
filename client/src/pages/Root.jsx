import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/local";
import UserContext from "../context/userContext";
import { getUserData } from "../utils/fetch";
import NavBar from "../components/navbar/navbar";

const Root = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchUserData();
        }
    }, []);

    async function fetchUserData() {
        const data = await getUserData();
        if (data.error) {
            navigate("/register");
        } else {
            setUser(data.data);
        }
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Root;
