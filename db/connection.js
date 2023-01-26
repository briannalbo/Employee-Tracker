//require mysql package
const mysql = require('mysql2');
//sets connection to db
const connector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeesLog'

});
//exports connection to be used in application
module.exports = connector;