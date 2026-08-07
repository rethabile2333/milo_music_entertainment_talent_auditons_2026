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
    const [judge] = await db.query(
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
    const [contestants] = await db.query(
      `
      SELECT user_id, full_name, role
      FROM users
      WHERE role = ?
      `,
      [category]
    );

    console.log("Contestants:", contestants.length);

    // Count completed reviews
    const [completed] = await db.query(
      `
      SELECT COUNT(*) AS completed
      FROM reviews
      WHERE judge_id = ?
      AND status = 'Completed'
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

router.post("/review", verifyToken, async (req, res) => {
  try {

    const judgeId = req.user.id;
    const { contestant_id, score, feedback } = req.body;

    if (!contestant_id || score === "" || score == null) {
      return res.status(400).json({
        error: "Contestant and score are required."
      });
    }

    const [existing] = await db.query(
      `
      SELECT *
      FROM reviews
      WHERE judge_id = ?
      AND contestant_id = ?
      `,
      [judgeId, contestant_id]
    );

    if (existing.length > 0) {

      await db.query(
        `
        UPDATE reviews
        SET
          score = ?,
          feedback = ?,
          status = 'Completed'
        WHERE
          judge_id = ?
        AND contestant_id = ?
        `,
        [
          score,
          feedback,
          judgeId,
          contestant_id
        ]
      );

    } else {

      await db.query(
        `
        INSERT INTO reviews
        (
          judge_id,
          contestant_id,
          score,
          feedback,
          status
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          judgeId,
          contestant_id,
          score,
          feedback,
          "Completed"
        ]
      );

    }

    res.json({
      message: "Review submitted successfully."
    });

  } catch (err) {

    console.error("REVIEW ERROR:", err);

    res.status(500).json({
      error: err.message,
      sqlMessage: err.sqlMessage,
      code: err.code
    });

  }
});

module.exports = router;
