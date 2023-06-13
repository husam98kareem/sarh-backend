const { register, login, getEmployeeById } = require("../controllers/auth");
const express = require("express")
const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/employee/:id", getEmployeeById)

module.exports = router;