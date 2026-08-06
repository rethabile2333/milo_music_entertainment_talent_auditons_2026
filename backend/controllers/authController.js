const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let rows;
    let account;
    let role;

    // Check users table
    [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      account = rows[0];
      role = account.role;
    } else {
      // Check judges table
      [rows] = await db.query(
        "SELECT * FROM judges WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          error: "User not found"
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
        error: "Invalid password"
      });
    }

    console.log("LOGIN ACCOUNT:", account);

    const payload = {
      id: account.user_id,
      role: role,
      judge_category: account.judge_category || null
    };

    console.log("JWT PAYLOAD:", payload);

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretkey",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      token,
      user: {
        user_id: account.user_id,
        full_name: account.full_name,
        email: account.email,
        role: role,
        judge_category: account.judge_category || null
      }
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
};