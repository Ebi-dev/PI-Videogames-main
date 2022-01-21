import React from "react";
import GameCard from "../gameCard/gameCard";
import { useState } from "react";
import styles from "./gameCards.module.css";

function GameCards({ games }) {
  const [state, setState] = useState({
    paginaActual: 0,
  });

  if (games.message) {
    return (
      <div>Ningun videojuego cumple con los parametros de busqueda...</div>
    );
  }

  // console.log("actualizado");
  // console.log("PAGE: " + state.paginaActual);

  function handlePrev(event) {
    if (state.paginaActual !== 0) {
      setState({ paginaActual: state.paginaActual - event.target.value });
    }
  }
  function handleNext(event) {
    if (state.paginaActual !== final.length - 1) {
      setState({
        paginaActual:
          parseInt(state.paginaActual) + parseInt(event.target.value),
      });
    }
  }

  let page1, page2, page3, page4, page5, page6;
  page1 = games.slice(0, 15);
  page2 = games.slice(15, 30);
  page3 = games.slice(30, 45);
  page4 = games.slice(60, 75);
  page5 = games.slice(75, 90);
  page6 = games.slice(90, 100);
  let final = [page1, page2, page3, page4, page5, page6];

  for (let i = final.length - 1; i > 0; i--) {
    if (!final[i].length) {
      final.pop();
    }
  }

  return (
    <div className={styles.all}>
      {/* {console.log("games: " + JSON.stringify(games))} */}
      <div className={styles.btnbox}>
        <span>pagina: {state.paginaActual + 1}</span>
        <br />
        <div className={styles.btn}>
          <button className={styles.button} value={1} onClick={handlePrev}>
            {"<"} anterior
          </button>
          <button className={styles.button} value={1} onClick={handleNext}>
            siguiente {">"}
          </button>
        </div>
      </div>
      <div >
        <ul>
          <div className={styles.cards}>
            {final[state.paginaActual] &&
              final[state.paginaActual].map((game, index) => {
                return (
                  <div key={game.id}>
                    {/* {console.log(
                  "id: " +
                    game.id +
                    " name: " +
                    game.name +
                    " image: " +
                    game.image +
                    " genres " +
                    game.genres
                )} */}
                    <li key={game.id}>
                      <GameCard
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres?.map((g) => {
                          return g.name;
                        })}
                        dbGenres={game.Genres?.map((g) => {
                          return g.name;
                        })}
                      />
                    </li>
                  </div>
                );
              })}
          </div>
        </ul>
      </div>
      <div className={styles.btnbox}>
        <span>pagina: {state.paginaActual + 1}</span>
        <br />
        <div className={styles.btn}>
          <button className={styles.button} value={1} onClick={handlePrev}>
            {"<"} anterior
          </button>
          <button className={styles.button} value={1} onClick={handleNext}>
            siguiente {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCards;
