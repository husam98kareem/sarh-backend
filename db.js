const mysql = require("mysql2")

const con = mysql.createConnection({
    host: "192.168.88.144",
    user: "husam1122",
    database: "sarh-alwarith",
    password: "husam1122",
})

module.exports = con