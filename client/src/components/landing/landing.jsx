import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";

export default function Landing() {
  return (
    <div className={styles.bg}>
      <div className={styles.all}>
        <div>
          <h1>Bienvenido a PI VIDEOGAMES</h1>
        </div>
        <Link to="/home">
          <button className={styles.enter}>ENTRAR</button>
        </Link>
      </div>
    </div>
  );
}
