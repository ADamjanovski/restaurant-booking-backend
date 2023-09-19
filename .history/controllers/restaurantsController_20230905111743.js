const Restaurants = require("../models/Restaurants");

class RestaurantsController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = 10; // Number of items per page
    try {
      const result = await User.paginate(
        {},
        { page: pageNumber, limit: pageSize }
      );

      const { docs, total, limit, page, pages } = result;
      res.json({ users: docs, total, limit, page, pages });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // async changeRating (req,res){

  // }
  async create(req, res) {
    const restaurant = new Restaurants({
      name: "Concept",
      email: "test@test.com",
      logo: "concept-logo.png",
      categories: ["Italian", "Breakfast"],
      scoreOfRating: 9,
      numberOfRating: 2,
    });

    try {
      const newRestaurant = await restaurant.save();
      return res.status(201).json(newRestaurant);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getRestaurant(req, res, next) {
    let restaurant;
    try {
      restaurant = await Restaurants.findById(req.params.id);
      if (restaurant == null) {
        return res.status(404).json({ message: "Cannot find Restaurant" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.restaurant = restaurant;
    next();
  }
}

module.exports = RestaurantsController;
