const db=require("../config/db");

exports.contestants=async(req,res)=>{

    try{

        const judge=req.user.user_id;

        const sql=`
        SELECT

        a.application_id,

        u.full_name,

        u.email,

        au.category,

        a.status

        FROM applications a

        JOIN users u

        ON a.user_id=u.user_id

        JOIN auditions au

        ON au.audition_id=a.audition_id

        WHERE a.judge_id=?

        ORDER BY u.full_name
        `;

        const [rows]=await db.query(sql,[judge]);

        res.json(rows);

    }

    catch(err){

        res.status(500).json({
            error:err.message
        });

    }

};