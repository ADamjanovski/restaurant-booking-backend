const express = require("express");
const DashboardController = require("../../controllers/dashboardController");
const dashboardController = new DashboardController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/", (req, res) => dashboardController.create(req, res));
router.get("/", (req, res) => dashboardController.index(req, res));
router.get("/:id", (req, res) => dashboardController.getUser(req, res));
router.get("/");

router.post("/tables", (req, res) =>
  dashboardController.getAvailableTables(req, res)
);
router.post("/reservation", (req, res) => {
  dashboardController.makeReservation(req, res);
});

router.get("/upcomingReservations/:id", (req, res) =>
  dashboardController.upcomingReservations(req, res)
);
router.patch("/updateStatus", auth, (req, res) =>
  dashboardController.updateStatus(req, res)
);
module.exports = router;
