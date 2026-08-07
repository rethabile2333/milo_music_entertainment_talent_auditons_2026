const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/auth");

router.get("/dashboard", verifyToken, async (req, res) => {
  try {

    console.log("========== JUDGE DASHBOARD ==========");
    console.log("Logged-in user:", req.user);

    const judgeId = req.user.id;
    console.log("Judge ID:", judgeId);

    // Get judge
    const [judge] = await db.promise().query(
      "SELECT * FROM judges WHERE user_id = ?",
      [judgeId]
    );

    console.log("Judge:", judge);

    if (judge.length === 0) {
      return res.status(404).json({
        error: "Judge not found"
      });
    }

    const category = judge[0].judge_category;
    console.log("Judge Category:", category);

    // Get contestants
    const [contestants] = await db.promise().query(
      `
      SELECT user_id, full_name, role
      FROM users
      WHERE role = ?
      `,
      [category]
    );

    console.log("Contestants:", contestants.length);

    // Count completed reviews
    const [completed] = await db.promise().query(
      `
      SELECT COUNT(*) AS completed
      FROM reviews
      WHERE judge_id = ?
      AND status='Completed'
      `,
      [judgeId]
    );

    console.log("Completed:", completed);

    res.json({
      profile: judge[0],
      stats: {
        assigned: contestants.length,
        pending: contestants.length - completed[0].completed,
        completed: completed[0].completed
      },
      contestants
    });

  } catch (err) {

    console.error("========== ERROR ==========");
    console.error(err);

    res.status(500).json({
      error: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
      sql: err.sql,
      stack: err.stack
    });

  }
});

module.exports = router;
