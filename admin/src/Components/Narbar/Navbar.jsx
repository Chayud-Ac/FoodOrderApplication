import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ login, setLogin }) => {
  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.GrabPanda_logo} alt="" />
      <div className="profile-container">
        <img className="profile" src={assets.profile_icon} alt="" />
        {login ? (
          <div className="logout" onClick={() => handleLogout()}>
            <p>Logout</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
