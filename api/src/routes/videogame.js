const { Router } = require("express");
const { getById, newGame } = require("../controlador/videogame.controller");

//importar funciones aqui

const router = Router();

// GET
router.get("/:id", getById);

//POST
router.post("/", newGame);

module.exports = router;
