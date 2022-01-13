const { Router } = require("express");

//importar funciones aqui
const { getGenres } = require("../controlador/genre.controller");

const router = Router();

//GET
router.get("/", getGenres);

module.exports = router;
