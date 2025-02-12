const connection = require("../database/db");

const obtenerVuelos = (req, res) => {
    connection.query("SELECT * FROM Ciudad", (err, resultados) => {
        if (err) return res.status(500).json({ error: "Error en la BD" });
        res.json(resultados);
    });
};

module.exports = { obtenerVuelos };
