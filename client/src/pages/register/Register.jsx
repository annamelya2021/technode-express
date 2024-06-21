import { useState, useContext } from "react";
import { register, login } from "../../utils/fetch";
import { saveToken } from "../../utils/local";
import { useNavigate } from "react-router-dom";
import Joi from "joi"; // Імпорт бібліотеки Joi
import UserContext from "../../context/userContext";
import "./Register.css";

const initialUserData = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: ""
}

const Register = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(initialUserData);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const schema = Joi.object({
        username: isRegister ? Joi.string().required() : Joi.string().allow(''),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: isRegister ? Joi.string()
            .min(8)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
            .messages({
                'string.min': 'Password must be at least {#limit} characters long',
                'string.pattern.base': 'Password must contain only alphanumeric characters',
                'any.required': 'Password is required'
            }) : Joi.string().allow(''),
        passwordRepeat: isRegister ? Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
        }) : Joi.string().allow(''),
    });

    const validateUserData = () => {
        const { error: validationError } = schema.validate(userData, { abortEarly: false });
        if (validationError) {
            setError(validationError.details.map(err => err.message).join(". "));
            return false;
        }
        return true;
    }

    const handleRegister = async () => {
        if (!validateUserData()) {
            return;
        }

        const result = await register(userData);
        if (!result.error) {
            setIsRegister(false);
            setError("User registered successfully.");
        } else {
            setError(result.error);
        }
    }

    const handleLogin = async () => {
        if (!validateUserData()) {
            return;
        }

        const result = await login(userData);
        if (!result.error) {
            setError("Login successful.");
            setUser(result.user);
            saveToken(result.token);
            navigate("/products");
        } else {
            setError(result.error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            handleRegister();
        } else {
            handleLogin();
        }
    }

    const handleUserData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
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
                        <input name="username" type="text" value={userData.username} onChange={handleUserData} required />
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
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Go to Login" : "Go to Register"}
            </button>
        </section>
    )
}

export default Register;
