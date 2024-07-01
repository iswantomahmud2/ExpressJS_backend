let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_api'
});

connection.connect(function error() {
    if (!error) {
        console.log(error);
    } else {
        console.log('koneksi database berhasil');
    }
})

module.exports = connection;