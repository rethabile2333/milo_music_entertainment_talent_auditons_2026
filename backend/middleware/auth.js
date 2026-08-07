const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {

    console.log("HEADERS:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            error: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            console.log(err);
            return res.status(401).json({
                error: "Invalid token"
            });
        }

        req.user = decoded;

        next();
    });

}

module.exports = {
  verifyToken,
};

