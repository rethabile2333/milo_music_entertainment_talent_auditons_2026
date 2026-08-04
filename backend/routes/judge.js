const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {

    dashboard,

    contestants,

    evaluate,

    saveEvaluation,

    results

} = require("../controllers/judgeController");

router.get("/dashboard",verifyToken,dashboard);

router.get("/contestants",verifyToken,contestants);

router.get("/evaluate/:id",verifyToken,evaluate);

router.post("/evaluate",verifyToken,saveEvaluation);

router.get("/results",verifyToken,results);

module.exports=router;