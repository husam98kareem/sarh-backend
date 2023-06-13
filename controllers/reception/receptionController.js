const con = require("../../db.js")

const addReviewer = (req, res) => {
    const sql = "INSERT INTO reviews (`reviewerName`,`reason`,`priorAppointment`,`time`,`date`,`reviewerNumber`) VALUES (?)";
    const values = [req.body.reviewerName, req.body.reason, req.body.priorAppointment, req.body.time, req.body.date, req.body.reviewerNumber];
    con.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("inserted successfully");
    })
}
const getReviewers = (req, res) => {
    const sql = "SELECT * FROM reviews"
    con.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
}





module.exports = {
    addReviewer,
    getReviewers
}