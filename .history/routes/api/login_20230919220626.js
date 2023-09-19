const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// router.post("/token", async (req, res) => {
//   const refreshToken = req.body.token;

//   if (refreshToken == null) return res.sendStatus(401);

//   if ((await UserToken.findOne({ token: refreshToken })) === null) {
//     return res.sendStatus(403);
//   }

//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     (err, tokenDetails) => {
//       if (err) return res.sendStatus(403);
//       const accessToken = generateAccessToken({ name: tokenDetails.name });
//       res
//         .status(200)
//         .json({ accessToken: accessToken, message: "Valid refresh token" });
//     }
//   );
// });

router.post("/login", async (req, res) => {
  let user;
  if (req.body.username != null) {
    user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
  }
  if (user == null) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ name: req.body.username });
    const refreshToken = jwt.sign(
      { name: req.body.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    return res.json({
      id: user.id,
      name : user.name,
      lastName : user.lastName,
      email : user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  });
}

module.exports = router;
