const mysql = require('mysql2');

// MySQL information
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bennkoly1#',
    database: 'employeetracker'
});

module.exports = db;