const con = require("../db.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res) => {
    const sql = "INSERT INTO employees (`employeeId`,`surname`,`firstName`,`middleName`,`lastName`,`dateOfBirth`,`gender`,`bloodGroup`,`company`,`dateOfStart`,`img`,`streetAddress`,`zipCode`,`country`,`city`,`mobile`,`email`) VALUES (?)";
    const values = [req.body.employeeId, req.body.surname, req.body.firstName, req.body.middleName, req.body.lastName, req.body.dateOfBirth, req.body.gender, req.body.bloodGroup, req.body.company, req.body.dateOfStart, req.body.img, req.body.streetAddress, req.body.zipCode, req.body.country, req.body.city, req.body.mobile, req.body.email]
    con.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("inserted successfully");
    })
}

const login = (req, res) => {
    username = req.body.username
        // check user
    sql = "SELECT * FROM employees WHERE username = ?"
    con.query(sql, [username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        //Check password
        const isPasswordCorrect = req.body.password === data[0].password;
        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");
        var data = JSON.parse(JSON.stringify(data[0]))
        res.status(200).json({
            id: data.id,
            name: data.name,
            username: data.username,
            department: data.department,
            isSectionManager: data.isSectionManager,
            isManager: data.isManager,
            //  token: generateToken(data.id, data.username)
        })
    })
}


const getEmployeeById = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE employeeId=?"
    con.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        res.status(200).send("success!");
    })
}

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, "jwtsecret", {
        expiresIn: '30d',
    })
}

module.exports = {
    register,
    login,
    getEmployeeById
}