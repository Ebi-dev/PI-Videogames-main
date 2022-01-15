import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GAMES_BY_GENRE = "GET_GAMES_BY_GENRE";
export const GET_GENRES = "GET_GENRES";
export const GET_ALL_FILTERED = "GET_ALL_FILTERED";
export const FILTER = "FILTER";
export const ORDENAR = "ORDENAR";
export const PAGINADO = "PAGINADO";

export function getAllGames(onlyDb = false) {
  return async function pedido(dispatch) {
    let aux = await axios.get("http://localhost:3001/videogames");
    //console.log(aux.data);
    let final = aux.data;
    if (onlyDb) {
      final = aux.data.filter((game) => {
        return game.id.toString().includes("-");
      });
    }

    return dispatch({
      type: GET_ALL_GAMES,
      payload: final,
    });
  };
}

export function getAllFiltered(showDb = false) {
  return async function pedido(dispatch) {
    let aux = await axios.get("http://localhost:3001/videogames");
    //console.log(aux.data);
    let final;
    if (showDb === true) {
      final = aux.data.filter((game) => {
        return game.id.toString().includes("-");
      });
    } else {
      final = aux.data.filter((game) => {
        return typeof game.id === "number";
      });
    }
    // console.log("filtered:" + JSON.stringify(final));
    return dispatch({
      type: GET_ALL_FILTERED,
      payload: final,
    });
  };
}

export function getGamesByName(name) {
  return async function pedido(dispatch) {
    let aux = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    console.log(aux.data);
    return dispatch({
      type: GET_GAMES_BY_NAME,
      payload: aux.data,
    });
  };
}

export function getGenres() {
  return async function pedido(dispatch) {
    let aux = await axios.get("http://localhost:3001/genres");
    console.log(aux.data);
    return dispatch({
      type: GET_GENRES,
      payload: aux.data,
    });
  };
}

export function getGamesByGenre(genreName) {
  return async function pedido(dispatch) {
    let aux = await axios.get(
      `http://localhost:3001/videogames?genreName=${genreName}`
    );
    return dispatch({
      type: GET_GAMES_BY_GENRE,
      payload: aux.data,
    });
  };
}

export function filtrarDb(games, filtro) {
  return function filter(dispatch) {
    dispatch({
      type: FILTER,
      payload: { games, filtro },
    });
  };
}

export function Ordenamiento(tipo, ascendiente) {
  return function order(dispatch) {
    dispatch({
      type: ORDENAR,
      payload: { tipo, ascendiente },
    });
  };
}



// export const getAllGames = () => (dispatch) => {
//   return fetch("http://localhost:3001/videogames")
//     .then((r) => r.json())
//     .then((json) => {
//       dispatch({ type: GET_ALL_GAMES, payload: json });
//     });
// };

// export const getGamesByName = (name) => (dispatch) => {
//   return fetch(`http://localhost:3001/videogames?name=${name}`)
//     .then((r) => r.json())
//     .then((json) => {
//       dispatch({ type: GET_GAMES_BY_NAME, payload: json });
//     });
//};
