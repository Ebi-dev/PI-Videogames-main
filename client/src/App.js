import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Create from "./components/create/create";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Detail game={state.detalle} />} />
        <Route path="/create" element={<Create genres={state.genres.data} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
