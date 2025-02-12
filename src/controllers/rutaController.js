const connection = require("../database/db");
const { dijkstra } = require("../services/dijkstra");


const encontrarRuta = (req, res) => {
    const { origen, destino } = req.params;

    try {
        connection.query("SELECT * FROM Ciudad", (err, ciudades) => {
            if (err) {
                console.error("Error en la consulta de ciudades:", err);
                return res.status(500).json({ mensaje: "Error en la BD" });
            }

            connection.query("SELECT * FROM Enlace", (err, enlaces) => {
                if (err) {
                    console.error("Error en la consulta de enlaces:", err);
                    return res.status(500).json({ mensaje: "Error en la BD" });
                }

                console.log("\n🔹 Ciudades obtenidas de la BD:", ciudades);
                console.log("\n🔹 Enlaces obtenidos de la BD:", enlaces);

               

                                // 🔹 Convertimos los datos de la BD en un grafo para Dijkstra
                let grafo = {};

                ciudades.forEach((ciudad) => {
                    grafo[ciudad.nombre] = {}; // Cada ciudad será una clave en el grafo
                });

                enlaces.forEach(({ idOrigen, idDestino, saturacion, tiempo }) => {
                    const origen = ciudades.find(ciudad => ciudad.id === idOrigen)?.nombre;
                    const destino = ciudades.find(ciudad => ciudad.id === idDestino)?.nombre;

                    if (!origen || !destino) return;

                    // Convertir valores de saturación y tiempo a números
                    const costo = parseFloat(saturacion) + parseFloat(tiempo);

                    if (isNaN(costo)) {
                        console.log(`Enlace inválido: ${origen} -> ${destino} con costo ${costo}`);
                        return; // No agregar enlaces con costos inválidos
                    }

                    if (!grafo[origen]) grafo[origen] = {};
                    grafo[origen][destino] = costo;
                });

                console.log("\n🔹 Grafo generado para Dijkstra:", grafo);


                console.log(dijkstra);  // Verifica si 'dijkstra' es un objeto o función

                // Calculo de la mejor ruta
                const ruta = dijkstra(grafo, origen, destino);

                console.log("\n🔹 Ruta calculada por Dijkstra:", ruta);

                if (!ruta || ruta.length === 0) {
                    return res.status(404).json({ mensaje: "No hay ruta disponible." });
                }

                return res.json({ ruta });
            });
        });
    } catch (err) {
        console.error("Error en el cálculo de la ruta:", err);
        return res.status(500).json({ mensaje: "Error en el servidor." });
    }
};

module.exports = { encontrarRuta };
