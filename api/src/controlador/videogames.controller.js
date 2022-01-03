const axios = require("axios");
const { Videogames } = require("../db");
const { YOUR_API_KEY } = process.env;

const getAll = async (req, res, next) => {
  try {
    const pedido = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    );
    //const pedidoBaseDatos = await Videogames.findAll({include: Genre});
    if (pedido /*|| pedidoBaseDatos*/) {
      let aux = pedido.data.results?.map((game) => {
        return {
          name: game.name,
          genres: game.genres,
          image: game.background_image,
        };
      });
      let final = [/*...pedidoBaseDatos,*/ ...aux];

      res.send(final);
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
