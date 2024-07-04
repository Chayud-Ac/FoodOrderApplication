import React from "react";
import Navbar from "./Components/Narbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Components/pages/Add/Add";
import List from "./Components/pages/List/List";
import Orders from "./Components/pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Login from "./Components/pages/Login/Login";
import { useEffect } from "react";

const App = () => {
  const url = "http://localhost:4000";

  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLogin(true);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar login={login} />
      <hr />
      {!login ? (
        <Login
          setLogin={setLogin}
          login={login}
          setToken={setToken}
          token={token}
          url={url}
          path="/"
        />
      ) : (
        <></>
      )}
      <div className="app-content">
        <Sidebar token={token} />
        <Routes>
          <Route path="/" element={<Add url={url} token={token} />} />
          <Route path="/list" element={<List url={url} token={token} />} />
          <Route path="/orders" element={<Orders url={url} token={token} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
