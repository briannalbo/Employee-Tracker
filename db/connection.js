const mysql = require('mysql2');

const connector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'

});

module.exports = connector;