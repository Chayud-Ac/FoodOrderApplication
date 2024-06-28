import React from "react";
import Navbar from "./Components/Narbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Components/pages/Add/Add";
import List from "./Components/pages/List/List";
import Orders from "./Components/pages/Orders/Orders";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
