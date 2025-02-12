const express = require("express");
const router = express.Router();
const { encontrarRuta } = require("../controllers/rutaController");

router.get("/:origen/:destino", encontrarRuta);

module.exports = router;
