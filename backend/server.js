const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config/db");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://milo-music-entertainment-talent-aud-mu.vercel.app/"
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/user", userRoutes);

// ================= REGISTER =================
app.post("/auth/register", async (req, res) => {
  const {
    full_name,
    email,
    password,
    role,
    genre,
    instrument_type,
    dance_style,
    model_type,
    judge_category,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    // Register Judge
    if (role === "Judge") {
      await db.query(
        `INSERT INTO judges
        (full_name, email, password_hash, judge_category)
        VALUES (?, ?, ?, ?)`,
        [full_name, email, hash, judge_category]
      );

      return res.json({
        message: "Judge registered successfully",
      });
    }

    // Register Contestant/Admin
    await db.query(
      `INSERT INTO users
      (full_name, email, password_hash, role, genre, instrument_type, dance_style, model_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hash,
        role,
        genre || null,
        instrument_type || null,
        dance_style || null,
        model_type || null,
      ]
    );

    res.json({
      message: "Registration successful",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// ================= LOGIN =================
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    // Check users table
    let [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      const user = rows[0];

      const valid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!valid) {
        return res.status(401).json({
          error: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.user_id,
          role: user.role,
        },
        "secretkey",
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        token,
        user,
      });
    }

    // Check judges table
    [rows] = await db.query(
      "SELECT * FROM judges WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const judge = rows[0];

    const valid = await bcrypt.compare(
      password,
      judge.password_hash
    );

    if (!valid) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: judge.judge_id,
        role: "Judge",
        judge_category: judge.judge_category,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        user_id: judge.judge_id,
        full_name: judge.full_name,
        email: judge.email,
        role: "Judge",
        judge_category: judge.judge_category,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});