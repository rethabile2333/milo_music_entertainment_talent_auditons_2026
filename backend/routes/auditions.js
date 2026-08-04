const express = require("express");
const { submitAudition, getAuditions } = require("../controllers/auditionController");
const router = express.Router();

router.post("/submit", submitAudition);
router.get("/", getAuditions);

module.exports = router;
