const mysql  = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-10695-0.cloudclusters.net',
    user: 'albert',
    password: 'Pak123@istan',
    database: 'fnmotivation',
    port: '10695',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0    
}) 

console.log('Database connected');

module.exports = pool;