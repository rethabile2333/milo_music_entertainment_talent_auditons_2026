const db = require("../config/db");

exports.updateProfile = (req, res) => {

    const sql = `
        UPDATE users
        SET
            full_name = ?,
            email = ?
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [
            req.body.full_name,
            req.body.email,
            req.user.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Profile updated successfully"
            });

        }
    );

};

