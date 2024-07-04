import React from "react";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ url, login, setLogin, token, setToken }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post(`${url}/api/admin/login`, data);
      if (response.data.success) {
        console.log(response.data.token);
        setLogin(true);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="login-popup-inputs">
            <input
              name="email"
              value={data.email}
              onChange={(e) => handleInputChange(e)}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              value={data.password}
              onChange={(e) => handleInputChange(e)}
              type="password"
              placeholder="Your password"
              required
            />
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
