import React from "react";
import styles from "./gameCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameDetail } from "../../redux/actions";

function GameCard({ id, name, image, genres, dbGenres }) {
  const dispatch = useDispatch();

  if (!image) {
    image =
      "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";
  }
  const navigate = useNavigate();

  function handleRedirect() {
    // console.log("dispatching id: " + id);
    dispatch(gameDetail(id));
    navigate(`/details`);
  }

  return (
    <div className={styles.card} onClick={handleRedirect}>
      <h5 className={styles.cardTitle}>{name}</h5>

      <ul>
        <div className={styles.genres}>
          <li>{genres?.join(", ")}</li>
          <li>{dbGenres?.join(", ")}</li>
        </div>
      </ul>

      <img src={image} alt="gameImg" />
    </div>
  );
}

export default GameCard;
