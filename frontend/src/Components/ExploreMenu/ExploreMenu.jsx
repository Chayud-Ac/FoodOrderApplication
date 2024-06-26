import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to give the best test and service to our customer to make
        sure they are satisfy with our service
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            //   Onclick event to change the category state variable to match with the item that user click
            onClick={() =>
              setCategory((prevState) =>
                prevState === item.menu_name ? prevState : item.menu_name
              )
            }
            className="explore-menu-list-item"
            key={index}
          >
            <img
              // adding active css class to style the image if the category state is matching with the item.menu_name
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
