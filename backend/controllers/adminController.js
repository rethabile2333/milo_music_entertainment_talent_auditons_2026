const db = require("../config/db");

exports.dashboard = async (req,res)=>{

    try{

        const [[contestants]] = await db.query(
            "SELECT COUNT(*) total FROM users WHERE role='contestant'"
        );

        const [[judges]] = await db.query(
            "SELECT COUNT(*) total FROM users WHERE role='judge'"
        );

        const [[auditions]] = await db.query(
            "SELECT COUNT(*) total FROM auditions"
        );

        const [[applications]] = await db.query(
            "SELECT COUNT(*) total FROM applications"
        );

        const [recentContestants] = await db.query(`
            SELECT
                u.user_id,
                u.full_name,
                u.email,
                a.category
            FROM users u
            LEFT JOIN applications ap
                ON u.user_id = ap.user_id
            LEFT JOIN auditions a
                ON ap.audition_id = a.audition_id
            WHERE u.role='contestant'
            ORDER BY u.user_id DESC
            LIMIT 5
        `);

        const [upcomingAuditions] = await db.query(`
            SELECT
                audition_id,
                category,
                audition_date,
                venue
            FROM auditions
            ORDER BY audition_date ASC
            LIMIT 5
        `);

        res.json({

            profile:req.user,

            stats:{
                contestants:contestants.total,
                judges:judges.total,
                auditions:auditions.total,
                applications:applications.total
            },

            recentContestants,

            upcomingAuditions

        });

    }

    catch(err){

        res.status(500).json({
            error:err.message
        });

    }

};