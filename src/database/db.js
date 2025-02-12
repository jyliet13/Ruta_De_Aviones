const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '14567515',
    database: 'vuelos',
});


connection.connect(function(err) {

    if(err) {
        console.error("error conexion a MySql: ", err.message);
        process.exit(1);
    } else {
        console.log("Conectado a la base de datos");
    }

});

module.exports = connection;