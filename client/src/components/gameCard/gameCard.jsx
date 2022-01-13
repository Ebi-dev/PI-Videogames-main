import React from "react";
import styles from "./gameCard.module.css"

function GameCard({ name, image, genres, dbGenres }) {

  if(!image){
    image = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg"
  }

  return (
    <div className="card">
      <div id="closeIcon" className="row"></div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="row">
          <ul syle={styles}>
            <li>{genres?.join(', ')}</li>
            <li>{dbGenres?.join(', ')}</li>
          </ul>
          <img style={{ height: 250, width: 400 }} src={image} alt="gameImg" />
        </div>
      </div>
    </div>
  );
}

export default GameCard;