import React, { useState, useContext, useEffect } from "react";
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
};

const Register = ({ onLogin, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleUserData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

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
        onLogin();
        onClose();
        navigate("/products");
      } else {
        setError(result.error);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!document.querySelector(".register-login").contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="register-login">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          name="email"
          type="text"
          value={userData.email}
          onChange={handleUserData}
          required
        />
        {isRegister && (
          <>
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              name="username"
              type="text"
              value={userData.username}
              onChange={handleUserData}
              required
            />
          </>
        )}
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleUserData}
          required
        />
        {isRegister && (
          <>
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input
              className="form-control"
              name="passwordRepeat"
              type="password"
              value={userData.passwordRepeat}
              onChange={handleUserData}
              required
            />
          </>
        )}
        <button type="submit" className="btn btn-primary">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <div className="switch-button">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="btn btn-link"
        >
          {isRegister ? "Go to Login" : "Go to Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
