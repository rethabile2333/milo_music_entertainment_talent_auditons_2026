const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {

    dashboard

} = require("../controllers/adminController");

router.get(
    "/dashboard",
    verifyToken,
    dashboard
);

module.exports = router;