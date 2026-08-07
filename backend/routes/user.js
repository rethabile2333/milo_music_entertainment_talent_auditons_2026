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

// Get judge feedback
router.get("/feedback", verifyToken, async (req,res)=>{

    try{

        const userId=req.user.id;


        const [feedback]=await db.query(
        `
        SELECT
            r.feedback,
            r.status,
            r.overall_score,
            u.full_name AS judge_name
        FROM reviews r
        JOIN judges u
        ON r.judge_id = u.user_id
        WHERE r.contestant_id = ?
        `,
        [userId]
        );


        res.json({
            feedback
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to load feedback"
        });

    }

});

// Get audition results
router.get("/results", verifyToken, async (req, res) => {

    try {

        const userId = req.user.id;

        const [results] = await db.query(
        `
        SELECT 
            r.overall_score,
            r.status,
            r.evaluated_at,
            u.full_name AS judge_name
        FROM reviews r
        JOIN judges u 
            ON r.judge_id = u.user_id
        WHERE r.contestant_id = ?
        `,
        [userId]
        );


        res.json({
            results
        });


    } catch(error){

        console.log(error);
        res.status(500).json({
            message:"Failed to load results"
        });

    }

});
