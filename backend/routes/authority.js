const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // attach user id from token payload
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
}

module.exports = { verifyToken };


module.exports = router;
