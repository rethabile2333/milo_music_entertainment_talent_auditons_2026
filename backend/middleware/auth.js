const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing",
    });
  }


  const token = authHeader.split(" ")[1];


  if (!token) {
    return res.status(401).json({
      error: "Token missing",
    });
  }


  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {


      if (err) {

        console.log("JWT ERROR:", err);

        return res.status(401).json({
          error: "Invalid token",
        });

      }


      req.user = {
        id: decoded.id,
        role: decoded.role,
      };


      next();

    }
  );

}

module.exports = {
  verifyToken,
};

