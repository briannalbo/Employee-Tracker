const mysql = require('mysql2');

const connector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeesLog'

});

module.exports = connector;