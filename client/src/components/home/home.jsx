import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getGamesByName,
  getGenres,
  getAllFiltered,
} from "../../redux/actions";
import GameCards from "../gameCards/gameCards";
import Search from "../search/search";
import Filter from "../filter/filter";

function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [lstate, setlstate] = useState({
    paginaActual: 0,
  });

  function handlePage(event) {
    setlstate({ ...lstate, paginaActual: event.target.value });
  }

  useEffect(() => {
    console.log("useEffect home");
    dispatch(getGenres());
    dispatch(getAllFiltered(false));
  }, []);

  return (
    <div>
      

      <Search
        onSearch={(name) => {
          console.log("search");
          dispatch(getGamesByName(name));
        }}
      />
      <Filter videogames={state.videogames} genres={state.genres.data} />

      <GameCards games={state.videogames} />
    </div>
  );
}

export default Home;
