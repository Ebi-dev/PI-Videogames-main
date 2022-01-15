const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

const getAll = async (req, res, next) => {
  try {
    let pedido, pedi2, pedi3, pedidofinal;
    if (req.query.name) {
      gameName = req.query.name;
      pedido = await axios.get(
        `https://api.rawg.io/api/games?search=${gameName}&page_size=15&key=${YOUR_API_KEY}`
      );
    } else {
      pedido = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=40`
      );

      pedi2 = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2&page_size=40`
      );

      pedi3 = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5&page_size=20`
      );

      pedidofinal = [...pedido.data.results, ...pedi2.data.results, ...pedi3.data.results];
      // pedido.data.results.push(await axios.get(
      //   `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2&page_size=40`
      // ).data.results)
      // pedido.data.results.push(await axios.get(
      //   `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3&page_size=40`
      // ).data.results)
    }

    const pedidoBaseDatos = await Videogame.findAll({ include: Genre });
    //console.log(JSON.stringify(pedidoBaseDatos));
    if (pedidofinal || pedidoBaseDatos) {
      let aux = pedidofinal?.map((game) => {
        return {
          name: game.name,
          genres: game.genres,
          image: game.background_image,
          rating: game.rating,
          id: game.id,
        };
      });
      let final = aux;
      if (req.query.name) {
        final = final.slice(0, 15);
        //console.log("LOGLOGLOG : " + final);
      } else {
        final = [...pedidoBaseDatos, ...aux];
      }

      if (req.query.genreName && final) {
        let selectedGenre = req.query.genreName;
        final = final.filter((game) => {
          return game.genres
            ?.map((gnr) => {
              return gnr.name;
            })
            .includes(selectedGenre);
        }); //fin filter
      }

      if (final[0]) {
        res.send(final);
      } else {
        res.json({
          message: "Ningun videojuego cumple con los parametros de busqueda",
        });
      }
    } else {
      res.json({ message: "Error, algo salio mal" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
