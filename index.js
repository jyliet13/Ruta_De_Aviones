const express = require("express")
const connection = require('./src/database/db');
const rutaRoutes = require('./src/routes/ruta');
const vueloRoutes = require('./src/routes/vuelo');


const app = express();
app.use(express.json());


// Rutas
app.use('/api/rutas', rutaRoutes); // Corrección en la URL
app.use('/api/vuelos', vueloRoutes);



const Port = 3000;

app.listen(Port, () => {
    console.log("Servidor escuchando en el puerto ${Port}");
    console.log("http://localhost:3000");
    
    

});