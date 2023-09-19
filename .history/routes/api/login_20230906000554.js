const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const UserToken = require("../../models/UserToken");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);

  if ((await UserToken.findOne({ token: refreshToken })) === null) {
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, tokenDetails) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: tokenDetails.name });
      res
        .status(200)
        .json({ accessToken: accessToken, message: "Valid refresh token" });
    }
  );
});

router.post("/login", async (req, res) => {
  let user;
  if (req.body.username != null) {
    user = await prisma.user
      .findUnique({
        where: {
          user: req.body.username,
        },
      })
      .exec();
  }
  if (user == null) {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ name: req.body.username });
    const refreshToken = jwt.sign(
      { name: req.body.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    const userToken = await prisma.token.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne({ userId: user._id });

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return res.json({
      id: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});
router.delete("/logout", auth, async (req, res) => {
  try {
    await UserToken.deleteOne({ userId: req.user._id });
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/checkLogin", auth, async (req, res) => {
  res.status(200).json({ user: req.user.username });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

module.exports = router;
