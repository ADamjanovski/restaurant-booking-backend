const express = require("express");
const DashboardController = require("../../controllers/dashboardController");
const dashboardController = new DashboardController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/", (req, res) => dashboardController.create(req, res));
router.get("/", (req, res) => dashboardController.index(req, res));
// router.get("/:id", (req, res) => dashboardController.getUser(req, res));
router.get("/");

router.post("/createTables", (req, res) =>
  dashboardController.createTables(req, res)
);

router.get("/upcomingReservations/:id", (req, res) =>
  dashboardController.upcomingReservations(req, res)
);
router.patch("/updateStatus", auth, (req, res) =>
  dashboardController.updateStatus(req, res)
);
router.patch("/updatePassword", auth, (req, res) =>
  dashboardController.UpdatePassword(req, res)
);

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
  
      // const userToken = await UserToken.findOne({ userId: user._id });
      // if (userToken) await userToken.deleteOne({ userId: user._id });
      // await new UserToken({ userId: user._id, token: refreshToken }).save();
      // const userToken = await prisma.token.findUnique({
      //   where: { userId: user.id },
      // });
      // if (userToken!==null) await prisma.token.delete({ where: { userId: user.id } });
      // await prisma.token.create({ userId: user.id, token: refreshToken });
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
module.exports = router;
