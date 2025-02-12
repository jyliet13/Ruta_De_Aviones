const express = require("express");
const router = express.Router();
const { obtenerVuelos } = require("../controllers/vueloController");
const controlador  = require("../controllers/vueloController")

console.log("obtenerVuelos:", obtenerVuelos);
console.log("controlador importadod:",  controlador)

router.get("/vuelos", obtenerVuelos);

module.exports = router;
