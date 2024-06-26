import React, { useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";

const Home = () => {
  //   this state category variable is used to track the current category base on the onClick element from the user
  // This state and state function are passing to the ExploreMenu as a props for styling the css
  const [category, setCategory] = useState("");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
