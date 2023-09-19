const express = require("express");
const RestaurantsController = require("../../controllers/restaurantsController");
const restaurantController = new RestaurantsController();
const router = express.Router();

router.post("/", (req, res) => restaurantController.create(req, res));
router.get("/", (req, res) => restaurantController.index(req, res));
router.get("/:id", (req, res) => restaurantController.getUser(req, res));
router.get("/");

router.post("/tables", (req, res) =>
  restaurantController.getAvailableTables(req, res)
);
router.post()
module.exports = router;
