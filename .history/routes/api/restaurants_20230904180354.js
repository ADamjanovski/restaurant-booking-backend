const express = require("express");
const RestaurantsController = require("../../controllers/Restaurants");
const restaurantController = new RestaurantsController();
const router = express.Router();

router.get("/");
