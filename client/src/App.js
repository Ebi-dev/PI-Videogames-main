import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing";
import Home from "./components/home/home";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
