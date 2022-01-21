import React from "react";
import { Link } from "react-router-dom";
import styles from "./detail.module.css";

function Detail({ game }) {
  if (!game.image) {
    game.image =
      "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg";
  }

  if (Array.isArray(game)) {
    return (
      <div className={styles.bg}>
        <div className={styles.title}>
          <h5>{game[0].name}</h5>
        </div>
        <div className={styles.IDcontainer}>
          <div className={styles.description}>{game[0].description}</div>
          <img
            style={{ height: 250, width: 400 }}
            src={game.image}
            alt="gameImg"
          />
        </div>
        <div className={styles.detail}>
          <div className={styles.row}>
            <ul>
              <li>
                Genres:{" "}
                {game[0].Genres?.map((g) => {
                  return g.name;
                }).join(", ")}
              </li>
              <li>Release date: {game[0].releaseDate}</li>
              <li>Rating: {game[0].rating}</li>
              <li>Platforms: {game[0].platforms}</li>
            </ul>
          </div>
          <Link to="/home">
            <button className={styles.returnHome}>volver a HOME</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.bg}>
        <div className={styles.title}>
          <h5>{game.name}</h5>
        </div>
        <div className={styles.IDcontainer}>
          <div className={styles.description}>{game.description}</div>
          <img
            style={{ height: 250, width: 400 }}
            src={game.image}
            alt="gameImg"
          />
        </div>
        <div className={styles.detail}>
          <div className={styles.row}>
            <ul>
              <li>
                Genres:{" "}
                {game.genres
                  ?.map((g) => {
                    return g.name;
                  })
                  .join(", ")}
              </li>
              <li>
                {game.dbGenres
                  ?.map((g) => {
                    return g.name;
                  })
                  .join(", ")}
              </li>
              <li>Release date: {game.released}</li>
              <li>Rating: {game.rating}</li>
              <li>Platforms: {game.platforms?.join(", ")}</li>
            </ul>
          </div>

          <Link to="/home">
            <button className={styles.returnHome}>volver a HOME</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Detail;
