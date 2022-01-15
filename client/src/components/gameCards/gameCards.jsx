import React from "react";
import GameCard from "../gameCard/gameCard";

function GameCards({ games }) {
  if (games.message) {
    return (
      <div>Ningun videojuego cumple con los parametros de busqueda...</div>
    );
  }

  return (
    <div className="cards">
      {/* {console.log("games: " + JSON.stringify(games))} */}
      <ul>
        {games &&
          games.map((game, index) => {
            return (
              <div key={game.id}>
                {/* {console.log(game)} */}
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
      </ul>
    </div>
  );
}

export default GameCards;
