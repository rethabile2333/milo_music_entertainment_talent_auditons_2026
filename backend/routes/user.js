const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/auth");
const { updateProfile } = require("../controllers/userController");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
        user_id,
        full_name,
        email,
        role
      FROM users
      WHERE user_id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      profile: rows[0],
    });

  } catch (err) {
    console.error("Profile Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});


router.put("/profile", verifyToken, updateProfile);

module.exports = router;

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
          user_id,
          full_name,
          email,
          role,
          category
       FROM users
       WHERE user_id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      profile: rows[0],
      results: []
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
