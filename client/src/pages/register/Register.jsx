import { useEffect, useState, useContext } from "react";
import { register, login } from "../../utils/fetch";
import { saveToken } from "../../utils/local";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import "./Register.css";

const initialUserData = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: ""
}

const Register = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(initialUserData);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleUserData = (e) => {
        e.preventDefault();
        const data = e.target.value;
        const key = e.target.name;
        setUserData(userData => ({
            ...userData,
            [key]: data
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        if (isRegister) {
            result = await register(userData);
            if (!result.error) {
                setIsRegister(false);
                setError("User registered successfully.");
            } else {
                setError(result.error);
            }
        } else {
            result = await login(userData);
            if (!result.error) {
                setError("Login successful.");
                setUser(result.user);
                saveToken(result.token);
                // navigate("/api-docs");
                navigate("/products");

                
            } else {
                setError(result.error);
            }
        }
    }

    return (
        <section className="register-login">
            <h2>{isRegister ? "Register" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" value={userData.email} onChange={handleUserData} required />
                {isRegister && (
                    <>
                        <label htmlFor="username">Username</label>
                        <input name="username" type="username" value={userData.username} onChange={handleUserData} required />
                    </>
                )}
                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={userData.password} onChange={handleUserData} required />
                {isRegister && (
                    <>
                        <label htmlFor="passwordRepeat">Repeat Password</label>
                        <input name="passwordRepeat" type="password" value={userData.passwordRepeat} onChange={handleUserData} required />
                    </>
                )}
                <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Go to Login" : "Go to Register"}</button>
        </section>
    )
}

export default Register;
