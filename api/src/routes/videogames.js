const { Router } = require("express");

//importar funciones aqui
const { getAll } = require("../controlador/videogames.controller");

const router = Router();

//GET
router.get("/", getAll);
//router.get("?name=", )

module.exports = router;
