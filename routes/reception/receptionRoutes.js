const { addReviewer, getReviewers } = require("../../controllers/reception/receptionController")
const express = require("express")
const router = express.Router();


router.post("/add", addReviewer)
router.get("/reviewers", getReviewers)
module.exports = router;