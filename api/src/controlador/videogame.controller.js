const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

const getById = async (req, res, next) => {
  try {
    if (req.params.id) {
      const { id } = req.params;
      let pedidoBaseDatos, pedido;

      if (id.includes("-")) {
        pedidoBaseDatos = await Videogame.findAll(
          {
            include: Genre,
            where: { id: id },
          }
        );
      } else {
        pedido = await axios.get(
          `https://api.rawg.io/api/games/${parseInt(id)}?key=${YOUR_API_KEY}`
        );
      }

      // console.log(JSON.stringify(pedido.data));

      if (pedido || pedidoBaseDatos) {
        let aux;
        if (pedido) {
          aux = {
            id: pedido.data.id,
            name: pedido.data.name,
            genres: pedido.data.genres,
            image: pedido.data.background_image,
            description: pedido.data.description_raw,
            released: pedido.data.released,
            rating: pedido.data.rating,
            platforms: pedido.data.platforms?.map((p) => {
              return p.platform.name;
            }),
          };
        }
        if (aux) {
          res.send(aux);
        } else {
          res.send(pedidoBaseDatos);
        }
      } else {
        res.send("errorxd");
      }
    }
  } catch (e) {
    next(e);
  }
};

const newGame = async (req, res, next) => {
  const { game, genreIds } = req.body;
  if (game) {
    try {

      let nuevo = await Videogame.create(game);

      let arr = [];

      for (let i = 0; i < genreIds.length; i++) {
        arr[i] = await nuevo.addGenre(genreIds[i]);
      }

      if (nuevo && arr[0])
        res.json({
          message: "creado y relacionado correctamente",
          data: nuevo,
        });
      else res.json({ message: "Error, no se pudo crear" });
    } catch (e) {
      next(e);
    }
  } else {
    res.json({ message: "No viene el pj en el body" });
  }
};

module.exports = {
  //funciones a exportar para las rutas
  getById,
  newGame,
};
