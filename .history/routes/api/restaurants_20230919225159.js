const express = require("express");
const RestaurantsController = require("../../controllers/restaurantsController");
const restaurantController = new RestaurantsController();
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", (req, res) => restaurantController.index(req, res));
// router.get("/:id", (req, res) => restaurantController.getUser(req, res));
router.get("/");
router.get("/upcomingReservations/:id", (req, res) =>
  restaurantController.upcomingReservations(req, res)
);
router.get("/suggestions", (req, res) =>
  restaurantController.getAutoComplete(req, res)
);
router.get("/rating/:id", (req, res) =>
  restaurantController.getRatingByUser(req, res)
);
router.get("/biggestTable/:id",(req,res)=>)
router.get("/images", (req, res) => restaurantController.getImages(req, res));
router.post("/tables", (req, res) =>
  restaurantController.getAvailableTables(req, res)
);
router.post("/reservation", auth, (req, res) => {
  restaurantController.makeReservation(req, res);
});

router.post("/rating", auth, (req, res) =>
  restaurantController.setRestaurantRating(req, res)
);

router.post("/partnerRequest", (req, res) =>
  restaurantController.makeRequest(req, res)
);
// router.post("/", (req, res) => restaurantController.create(req, res));

module.exports = router;
