const express = require("express");
const RestaurantsController = require("../../models/Restaurants");
const restaurantController = new RestaurantsController();
const router = express.Router();

router.get("/");
