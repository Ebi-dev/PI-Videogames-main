import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Bienvenido a PI VIDEOGAMES (nombre provisorio) !</h1>
      <Link to="/home">
        <button>ENTRAR</button>
      </Link>
    </div>
  );
}
