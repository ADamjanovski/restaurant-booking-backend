const express = require("express");
const RestaurantsController = require("../../controllers/restaurantsController");
const restaurantController = new RestaurantsController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", (req, res) => restaurantController.index(req, res));
router.get("/:id", (req, res) => restaurantController.getUser(req, res));
router.get("/");
router.get("/upcomingReservations/:id", (req, res) =>
  restaurantController.upcomingReservations(req, res)
);
router.get("/suggestions", (req, res) =>
  restaurantController.getAutoComplete(req, res)
);
router.post("/tables", (req, res) =>
  restaurantController.getAvailableTables(req, res)
);
router.post("/reservation", (req, res) => {
  restaurantController.makeReservation(req, res);
});
router.post("/", (req, res) => restaurantController.create(req, res));

module.exports = router;
