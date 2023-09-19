const Restaurants = require("../models/Restaurants");

class RestaurantsController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      const Restaurants = await Restaurants.find();
      return res.json(Restaurants);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

//   async create(req, res) {
//     console.log(req.body.password);
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const restaurant = new Restaurants({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     try {
//       const newUser = await user.save();
//       return res.status(201).json(newUser);
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   }

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
    res.restaurant =restaurant;
    next();
  }
}

module.exports = RestaurantsController;
