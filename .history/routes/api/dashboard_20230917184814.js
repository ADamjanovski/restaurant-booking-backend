const express = require("express");
const DashboardController = require("../../controllers/dashboardController");
const dashboardController = new DashboardController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/", (req, res) => dashboardController.create(req, res));
router.get("/");
router.post("/createTables", (req, res) =>
  dashboardController.createTables(req, res)
);
router.get("/upcomingReservations/:id/:myCursor", (req, res) =>
  dashboardController.upcomingReservations(req, res)
);
router.get("/pastReservations/:id/:myCursor", (req, res) =>
  dashboardController.pastReservations(req, res)
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

router.get("/tables/:id", (req, res) => dashboardController.getTables(req, res));
router.post("/tables", auth, (req, res) =>
  dashboardController.createTables(req, res)
);
