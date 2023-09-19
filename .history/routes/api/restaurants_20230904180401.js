const express = require("express");
const RestaurantsController = require("../../controllers");
const restaurantController = new RestaurantsController();
const router = express.Router();

router.get("/");
