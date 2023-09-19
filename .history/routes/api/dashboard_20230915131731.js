const express = require("express");
const DashboardControllerController = require("../../controllers/dashboardController");
const restaurantController = new RestaurantsController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/", (req, res) => restaurantController.create(req, res));
router.get("/", (req, res) => restaurantController.index(req, res));
router.get("/:id", (req, res) => restaurantController.getUser(req, res));
router.get("/");

router.post("/tables", (req, res) =>
  restaurantController.getAvailableTables(req, res)
);
router.post("/reservation", (req, res) => {
  restaurantController.makeReservation(req, res);
});

router.get("/upcomingReservations/:id", (req, res) =>
  restaurantController.upcomingReservations(req, res)
);
router.patch("/updateStatus", auth, (req, res) =>
  restaurantController.updateStatus(req, res)
);
module.exports = router;
