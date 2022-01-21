import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newGame } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./create.module.css";

function Create({ genres }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    description: "",
    released: "default",
    rating: 1,
    genres: [],
    platforms: [],
  });

  const [error, setError] = useState(true);

  let platforms = [
    "PC",
    "Playstation 5",
    "Playstation 4",
    "Xbox One",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "GameBoy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
  ];
  let genreIds = [
    4, 51, 3, 5, 10, 2, 40, 14, 7, 11, 83, 1, 59, 15, 6, 19, 28, 34, 17,
  ];

  useEffect(() => {
    console.log(error);

    if (
      info.name.length > 0 &&
      info.name.length <= 35 &&
      info.description.length > 0 &&
      info.description.length <= 250 &&
      info.released !== "default" &&
      info.platforms.length > 0 &&
      info.genres.length > 0
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [info, setError]);

  function handleChange(e) {
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleCheckbox(e) {
    // console.log("valor: " + e.target.value);
    // console.log("id: " + e.target.id);
    // console.log("info: " + info[e.target.id]);
    setInfo((prevInfo) => {
      if (e.target.id === "genres") {
        if (!info.genres.includes(e.target.value)) {
          return {
            ...prevInfo,
            genres: [...info.genres, e.target.value],
          };
        } else {
          console.log("eliminao");
          let index = info.genres.indexOf(e.target.value);
          return {
            ...prevInfo,
            genres: info.genres.filter((p, i) => {
              return i !== index;
            }),
          };
        }
      } else {
        if (!info.platforms.includes(e.target.value)) {
          return {
            ...prevInfo,
            platforms: [...info.platforms, e.target.value],
          };
        } else {
          // console.log("eliminao");
          let index = info.platforms.indexOf(e.target.value);
          // console.log(index);
          return {
            ...prevInfo,
            platforms: info.platforms.filter((p, i) => {
              return i !== index;
            }),
          };
        }
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(info);
    dispatch(newGame(info));
    navigate("/home");
  }

  return (
    <div>
      <div className={styles.createGame}>
        <div className={styles.title}>
          <h2>Crear nuevo videojuego</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div className={styles.form1}>
                <div className={styles.name}>
                  <span>Nombre</span>
                  <input
                    type="text"
                    name="name"
                    id="1"
                    onChange={handleChange}
                  />
                  <span>{info.name.length} / 35</span>
                </div>

                <div className={styles.descr}>
                  <span>Descripcion</span>
                  <textarea name="description" id="2" onChange={handleChange} />
                  <span>{info.description.length} / 250 caracteres</span>
                </div>
              </div>
              <div className={styles.form2}>
                <div className={styles.released}>
                  <span>Fecha de lanzamiento</span>
                  <input
                    type="date"
                    name="released"
                    id="3"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.rating}>
                  <span>Rating</span>
                  <select name="rating" id="4" onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.checkCont}>
              <div className={styles.indic}>
                <span>Genero(s)</span>
              </div>
              <div className={styles.checkGenre}>
                {genres &&
                  genres.map((genre, key) => {
                    return (
                      <div key={key} className={styles.checkbox}>
                        <span>{genre.name}</span>
                        <input
                          type="checkbox"
                          name={genre.name}
                          value={genreIds[key]}
                          id="genres"
                          onChange={handleCheckbox}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className={styles.indic}>
                <span>Plataforma(s)</span>
              </div>
              <div className={styles.checkPlatform}>
                {platforms.map((platform, key) => {
                  return (
                    <div key={key} className={styles.checkbox}>
                      <span>{platform}</span>
                      <input
                        type="checkbox"
                        name={platform}
                        value={platform}
                        id="platforms"
                        onChange={handleCheckbox}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.btnCont}>
              <button type="submit" disabled={error} className={styles.botones}>
                CREAR
              </button>
              <Link to="/home">
                <button className={styles.botones}>volver a HOME</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
