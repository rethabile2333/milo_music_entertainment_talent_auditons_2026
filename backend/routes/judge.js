const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/auth");


router.get("/dashboard", verifyToken, async (req, res) => {

    try {

        const judgeId = req.user.id;

        const [judge] = await db.promise().query(

            "SELECT * FROM judges WHERE user_id=?",

            [judgeId]

        );

        if (judge.length === 0) {

            return res.status(404).json({

                error: "Judge not found"

            });

        }

        const category = judge[0].judge_category;

        const [contestants] = await db.promise().query(

            `
            SELECT
            user_id,
            full_name,
            role
            FROM users
            WHERE role=?
            `,

            [category]

        );

        const [completed] = await db.promise().query(

            `
            SELECT COUNT(*) completed

            FROM reviews

            WHERE judge_id=?

            AND status='Completed'
            `,

            [judgeId]

        );

        res.json({

            profile: judge[0],

            stats: {

                assigned: contestants.length,

                pending:
                    contestants.length -
                    completed[0].completed,

                completed:
                    completed[0].completed

            },

            contestants

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json(err);

    }

});

module.exports=router;