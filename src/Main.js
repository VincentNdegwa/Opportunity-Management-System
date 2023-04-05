import React from "react";
import Homepage from "./HomePage/Homepage";
import FrontPage from "./FrontPage/FrontPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
function Main(props) {
  console.log(props);
  return (
    <div>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/user/:id" element={<Homepage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Main;
