const db = require("../config/db");

exports.submitAudition = async (req, res) => {
  const { user_id, performance_link, instrument, audition_date } = req.body;
  try {
    await db.query(
      "INSERT INTO auditions (user_id, performance_link, instrument, audition_date) VALUES (?,?,?,?)",
      [user_id, performance_link, instrument, audition_date]
    );
    res.json({ message: "Audition submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuditions = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM auditions");
  res.json(rows);
};
