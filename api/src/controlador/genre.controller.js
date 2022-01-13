const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

const getGenres = async (req, res, next) => {
  try {
    let pedido = await axios.get(
      `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
    );

    let genresAux = [];

    pedido.data.results?.map((genre) => {
      genresAux.push({ id: genre.id, name: genre.name });
    });

    genresAux.forEach((genre) => {
      Genre.findOrCreate({
        where: { name: genre.name, id: genre.id },
      });
    });

    res.json({
      message: "se cargo exitosamente la db de genres",
      data: pedido.data.results,
    });
  } catch (e) {
    next(e);
  }
};

// const getGamesByGenre = async (req, res, next) => {
//   try {
    
//     let pedido = await axios.get(
//       `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
//     );

//   } catch (e) {
//     next(e);
//   }
// };

module.exports = {
  //funciones a exportar para las rutas
  getGenres,
};
