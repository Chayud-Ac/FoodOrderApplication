import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useState } from "react";

const FoodItem = ({ id, name, image, price, description, category }) => {
  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {/* Show the different image depending on the itemCount state variable */}
        {!itemCount ? (
          <img
            className="add"
            onClick={() => setItemCount((prevState) => prevState + 1)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => setItemCount((prevState) => prevState - 1)}
              src={assets.remove_icon_red}
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setItemCount((prevState) => prevState + 1)}
              src={assets.add_icon_green}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">$ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
