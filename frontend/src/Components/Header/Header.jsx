import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Once you try you will forget your name</h2>
        <p>
          Choose from a menu featuring a delectable array of dishes crafted with
          the finest satisfy your craving and elevate your dining experience ,
          one delicious meal at a time
        </p>
        <button>
          <a href="#explore-menu">View Menu</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
