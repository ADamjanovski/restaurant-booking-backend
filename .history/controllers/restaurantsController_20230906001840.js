const Restaurants = require("../models/Restaurants");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
class RestaurantsController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = 10; // Number of items per page
    try {
      // const result = await Restaurants.paginate(
      //   {},
      //   { page: pageNumber, limit: pageSize }
      // );
      const result = await prisma.restaurant.

      const { docs, total, limit, page, pages } = result;
      console.log(docs);
      res.json({ users: docs, total, limit, page, pages });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // async changeRating (req,res){

  // }
  async create(req, res) {
    // const restaurant = new Restaurants({
    //   name: "Skopski Merak",
    //   email: "test1@test.com",
    //   logo: "skopski-merak.png",
    //   categories: [],
    //   scoreOfRating: 14,
    //   numberOfRating: 4,
    // });

    try {
      const newRestaurant = await prisma.create({
        name: "Skopski Merak",
        email: "test1@test.com",
        logo: "skopski-merak.png",
        categories: [],
        scoreOfRating: 14,
        numberOfRating: 4,
      });
      // const newRestaurant = await restaurant.save();
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
    return res.status(201).json(restaurant);
    // res.restaurant = restaurant;
    // next();
  }
}

module.exports = RestaurantsController;
