import React from "react";
import styles from "./search.module.css";

export default function Search({ onSearch }) {

  function handleOnSearch() {
    if (typeof onSearch === "function") {
      const input = document.getElementById("searchInput");
      onSearch(input.value);
    }
  }
  return (
    <div className={styles.container}>
        <input
        autoComplete="off"
        className={styles.input}
        id="searchInput"
        type="text"
        placeholder="Buscar Juegos..."
        onChange={handleOnSearch}
      />
      
    </div>
  );
}
