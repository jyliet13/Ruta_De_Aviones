
const {  pool } = require('../database/db');

async function getCiudades() {
    
    const result = await pool.request().Query("SELECT * FROM Ciudad")
    return result.recordset;

}

async function getEnlaces(params) {
    const pool = await pool
    const result = await pool.request().Query("SELECT * FROM Enlace")
    return result.recordset;
    
    
}

module.exports = { getCiudades, getEnlaces };