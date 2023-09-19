const express = require("express");
const DashboardController = require("../../controllers/dashboardController");
const dashboardController = new DashboardController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/", (req, res) => dashboardController.create(req, res));
// router.get("/", (req, res) => dashboardController.index(req, res));
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
router.get("/restaurants/:myCursor", (req, res) =>
  dashboardController.index(req, res)
);
router.post("/login", (req, res) => dashboardController.login(req, res));
module.exports = router;
