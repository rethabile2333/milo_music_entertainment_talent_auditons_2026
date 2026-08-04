const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Look in users table first
    let [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let account;
    let role;

    if (rows.length > 0) {
      account = rows[0];
      role = account.role;
    } else {
      // If not found, look in judges table
      [rows] = await db.query(
        "SELECT * FROM judges WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      account = rows[0];
      role = "Judge";
    }

    const valid = await bcrypt.compare(
      password,
      account.password_hash
    );

    if (!valid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: account.user_id,
        role,
        judge_category: account.judge_category || null,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        ...account,
        role,
      },
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};