const express = require("express");
const { getAll, createVacation, updateVacationBySectionManager, getVacation, updateVacationByManager, updateVacationByHr, getByDate, } = require("../controllers/humanResources");
const router = express.Router();
router.post("/", createVacation)
router.get("/", getAll);

router.get("/data/", getByDate);
router.get("/:id", getVacation);
router.put("/:id", updateVacationBySectionManager)
router.put("/manager/:id", updateVacationByManager)
router.put("/hr/:id", updateVacationByHr)
module.exports = router;