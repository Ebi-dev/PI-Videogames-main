//importar acciones
import {
  GET_ALL_GAMES,
  GET_GAMES_BY_GENRE,
  GET_GAMES_BY_NAME,
  GET_GENRES,
  GET_ALL_FILTERED,
  FILTER,
  ORDENAR,
} from "../actions";

const initialState = {
  videogames: [],
  genres: [],
  filtrados: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES:
      console.log("get all games");
      return {
        ...state,
        videogames: action.payload,
        filtrados: action.payload,
      };
    case GET_GAMES_BY_NAME:
      console.log("get games by name");
      return { ...state, videogames: action.payload };
    case GET_GENRES:
      console.log("get genres");
      return { ...state, genres: action.payload };
    case GET_GAMES_BY_GENRE:
      console.log("get games by genre");
      return { ...state, videogames: action.payload };
    case GET_ALL_FILTERED:
      console.log("get all filtered");
      return { ...state, videogames: action.payload };

    case ORDENAR:
      console.log("Ordenar");
      if (action.payload.tipo === "Alfabeticamente") {
        console.log("Alfabeticamente y ");
        if (action.payload.ascendiente === "Ascendiente") {
          console.log("Ascendiente");
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => {
              if(a.name > b.name) return 1;
              if(a.name < b.name) return -1;
              return 0;
            }),
          };
        } else {
          console.log("Descendiente");
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => {
              if(a.name < b.name) return 1;
              if(a.name > b.name) return -1;
              return 0;
            }),
          };
        }
      } else {
        console.log("Por rating y ");
        if (action.payload.ascendiente === "Ascendiente") {
          console.log("Ascendiente");
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => {
              if(a.rating > b.rating) return 1;
              if(a.rating < b.rating) return -1;
              return 0;
            }),
          };
        } else {
          console.log("Descendiente");
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => {
              if(a.rating < b.rating) return 1;
              if(a.rating > b.rating) return -1;
              return 0;
            }),
          };
        }
      }


    case FILTER:
      console.log("filter");
      const filtered = action.payload.games.filter((g) => {
        return g.id.toString().includes("-") === action.payload.filtro;
      });
      return {
        ...state,
        videogames: filtered,
      };
    default:
      console.log("default");
      return state;
  }
}

export default reducer;
