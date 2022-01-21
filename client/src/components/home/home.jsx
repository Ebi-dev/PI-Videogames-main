import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGamesByName, getGenres, getAllFiltered } from "../../redux/actions";
import GameCards from "../gameCards/gameCards";
import Search from "../search/search";
import Filter from "../filter/filter";
import styles from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    // console.log("useEffect home");
    dispatch(getGenres());
    //dispatch(getAllFiltered(false));
  }, []);

  function handleSearch(name) {
    // console.log("search");
    if (!name.length) {
      dispatch(getAllFiltered(false));
    } else {
      dispatch(getGamesByName(name));
    }
  }

  return (
    <div className={styles.home}>
      <Search onSearch={handleSearch} />
      <Filter videogames={state.videogames} genres={state.genres.data} />
      <div className={styles.create}>
        <Link to="/create">
          <button>Crear Entrada</button>
        </Link>
      </div>

      <GameCards games={state.videogames} />
    </div>
  );
}

export default Home;
