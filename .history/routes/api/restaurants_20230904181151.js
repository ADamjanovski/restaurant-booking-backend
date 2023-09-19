const express = require("express");
const RestaurantsController = require("../../controllers/restaurantsController");
const restaurantController = new RestaurantsController();
const router = express.Router();

router.post("/", (req, res) => restaurantController.create(req, res));
router.get("/")
router.get("/");
module.exports = router;
