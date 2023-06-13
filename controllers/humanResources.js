const con = require("../db.js")
const createVacation = (req, res) => {
    sql = "INSERT INTO human (name,dept,type,duration,fromDate,toDate,reason,jobDesc,employeeSignUrl,sectionManagerName,sectionManagerSignUrl,managerSign,managerMargin,hrSignUrl) VALUES(?)";
    const values = [req.body.name, req.body.dept, req.body.type, req.body.duration, req.body.fromDate, req.body.toDate, req.body.reason, req.body.jobDesc, req.body.employeeSignUrl, req.body.sectionManagerName, req.body.sectionManagerSignUrl, req.body.managerMargin, req.body.managerSign, req.body.hrSignUrl];
    con.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("inserted order");
    });
}





const getAll = (req, res) => {
    con.query("SELECT * FROM human", (err, result) => {
        if (err) throw err
        res.send(result)
    })
}
const getVacation = (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM human WHERE ID=?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}

const updateVacationBySectionManager = (req, res) => {
    const id = req.params.id;
    const sectionManagerName = req.body.sectionManagerName
    const sectionManagerSignUrl = req.body.sectionManagerSignUrl
    con.query('UPDATE human SET sectionManagerName=?,sectionManagerSignUrl=? WHERE ID=? ', [sectionManagerName, sectionManagerSignUrl, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}
const updateVacationByManager = (req, res) => {
    const id = req.params.id;
    const managerMargin = req.body.managerMargin
    const managerSign = req.body.managerSign
    con.query('UPDATE human SET managerMargin=?,managerSign=? WHERE ID=? ', [managerMargin, managerSign, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}
const updateVacationByHr = (req, res) => {
    const id = req.params.id;

    const hrSignUrl = req.body.hrSignUrl
    con.query('UPDATE human SET hrSignUrl=? WHERE ID=? ', [hrSignUrl, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}

const getByDate = (req, res) => {

    const date = Date.now()
    const today = `${new Date(date).getFullYear()}-${new Date(date).getMonth() +1}-${ new Date(date).getDate()-1}`
    const query = 'SELECT * FROM human WHERE createdAt >=?'
    con.query(query, [today], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}

module.exports = {
    getAll,
    createVacation,
    updateVacationBySectionManager,
    updateVacationByManager,
    updateVacationByHr,
    getVacation,
    getByDate,

}