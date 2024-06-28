import React from "react";
import Navbar from "./Components/Narbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
