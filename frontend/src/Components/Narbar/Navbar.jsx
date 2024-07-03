import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.grabpanda_icon} className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.cart_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() ? "dot " : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            {" "}
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => logout()}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
