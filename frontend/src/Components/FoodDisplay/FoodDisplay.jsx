import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter the list based on the category
  const filteredList =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you {category}</h2>
      <div className="food-display-list">
        {filteredList.map((item, index) => (
          <FoodItem
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
