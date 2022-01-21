import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./filter.module.css";
import {
  getAllFiltered,
  getGamesByGenre,
  Ordenamiento,
} from "../../redux/actions/index";

function Filter({ genres }) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    existentes: true,
    selectedGenre: "notDefined",
    ordenamiento: "Alfabeticamente",
    ascendiente: "Ascendiente",
  });

  //Filtro por genero
  useEffect(() => {
    // console.log("useEffect genres");
    if (state.selectedGenre !== "notDefined") {
      dispatch(getGamesByGenre(state.selectedGenre));
    } else {
      dispatch(getAllFiltered(!state.existentes));
    }
  }, [state.selectedGenre]);

  //Ver existentes o DB
  useEffect(() => {
    // console.log("useEffect existentes");
    // console.log(state.existentes);
    if (state.existentes === true) {
      dispatch(getAllFiltered(false));
    } else {
      dispatch(getAllFiltered(true));
    }
  }, [state.existentes]);

  //Tipo de Ordenamiento
  useEffect(() => {
    // console.log("useEffect ordenamiento");
    dispatch(Ordenamiento(state.ordenamiento, state.ascendiente));
  }, [state.ordenamiento, state.ascendiente]);

  function handleChange(event) {
    setState({ ...state, selectedGenre: event.target.value });
  }

  function handleCheck() {
    setState({ ...state, existentes: !state.existentes });
  }

  function handleOrder(event) {
    setState({ ...state, ordenamiento: event.target.value });
  }

  function handleSentido(event) {
    setState({ ...state, ascendiente: event.target.value });
  }

  return (
    <div className={styles.container}>
      <div className={styles.existentes}>
        <h4>Filtrar por existentes</h4>
        <span>
          <input
            type="checkbox"
            name="existentes"
            id="1"
            value={state.existentes}
            onClick={handleCheck}
            defaultChecked
            className={styles.checkbox}
          />
          ver solo juegos existentes
        </span>
        {/* <span>{`   ---->estado: ${state.existentes}`}</span> */}
      </div>
      <div>
        <h4>Filtrar por genero</h4>
        <div>
          {/* {console.log("LOGLOGLOG: " + JSON.stringify(temperaments))} */}
          <select
            name="genres"
            id="2"
            value={state.selectedGenre}
            onChange={handleChange}
          >
            <option value="notDefined" key={0}>
              Ver Todos
            </option>
            {genres &&
              genres.map((g) => {
                return (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                );
              })}
          </select>
          {/* <span>{state.selectedGenre}</span> */}
        </div>
      </div>
      <div>
        <div>
          <h4>Ordenar:</h4>
          <select
            name="orden"
            id="5"
            value={state.ordenamiento}
            onChange={handleOrder}
          >
            <option value="Alfabeticamente" key={0}>
              Alfabeticamente
            </option>
            <option value="Por Rating" key={1}>
              Por Rating
            </option>
          </select>
          {/* <span>------{state.ordenamiento}</span> */}
        </div>
      </div>
      <div>
        <h4>sentido:</h4>
        <input
          type="radio"
          name="sentido"
          id="3"
          value="Ascendiente"
          onClick={handleSentido}
          defaultChecked
        />
        <label>Ascendiente</label>
        <input
          type="radio"
          name="sentido"
          id="4"
          value="Descendiente"
          onClick={handleSentido}
        />
        <label>Descendiente</label>
        {/* <span> ---{state.ascendiente}</span> */}
      </div>
    </div>
  );
}

export default Filter;
