require("dotenv").config();
const jwt = require("jsonwebtoken");

// const userModel = require("../models/User");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "You have no permission to read this" });
    userModel.findOne({ username: user.name }).then((usr) => {
      // req.token = token;
      req.user = usr;
      return next();
    });
  });
}

module.exports = authenticateToken;
