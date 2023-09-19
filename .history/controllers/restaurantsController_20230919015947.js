const { connect } = require("mongoose");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RestaurantsController {
  async index(req, res) {
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = 10; // Number of items per page
    try {
      if (req.query.categories === undefined) {
        const result = await prisma.restaurant.findMany({
          take: 10,
          skip: req.query.myCursor === undefined ? 0 : 1,
          include: {
            Rating: true, // Include the 'rating' relation
          },
          myCursor:
            req.query.myCursor === undefined ? undefined : req.query.myCursor,
        });
        return res.status(200).json(result);
      } else {
        const result = await prisma.categories.findMany({
          take: 10,
          skip: req.query.myCursor === undefined ? 0 : 1,
          where: {
            name: {
              in: JSON.parse(req.query.categories),
            },
          },
          include: {
            restaurant: true,
            include: {
              Rating: true,
            },
          },
          myCursor:
            req.query.myCursor === undefined ? undefined : +req.query.myCursor,
        });
        return res.status(200).json(result);
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }

  // async changeRating (req,res){

  // }
  // async create(req, res) {
  //   try {
  //     const newRestaurant = await prisma.restaurant.create({
  //       data: {},
  //     });

  //     // const newRestaurant = await restaurant.save();
  //     return res.status(201).json(newRestaurant);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  // async getRestaurant(req, res, next) {
  //   let restaurant;
  //   try {
  //     restaurant = await prisma.restaurant.findUnique({
  //       where: { id: req.params.id },
  //     });
  //     if (restaurant == null) {
  //       return res.status(404).json({ message: "Cannot find Restaurant" });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  //   return res.status(201).json(restaurant);
  // }
  async getAvailableTables(req, res) {
    try {
      const tables = await prisma.tables.findMany({
        where: {
          restaurantId: req.body.id,
          numberOfSeats: {
            gte: req.body.seats,
          },
          Reservations: {
            none: {
              datetime: req.body.datetime,
            },
          },
        },
        orderBy: {
          numberOfSeats: "desc",
        },
      });
      const updatedTables = tables.filter(
        (table) =>
          table.numberOfSeats - req.body.seats <= 2 &&
          table.numberOfSeats - req.body.seats >= 0
      );
      const exactNumberTables = updatedTables.filter(
        (table) => table.numberOfSeats == req.body.seats
      );
      if (exactNumberTables.length > 0) {
        return res.status(200).json(exactNumberTables);
      }
      if (updatedTables) {
        return res.status(200).json(updatedTables);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async makeReservation(req, res) {
    try {
      const newReservation = await prisma.reservations.create({
        data: {
          restaurantId: req.body.restaurantId,
          customerId: req.body.id,
          tableId: req.body.tableId,
          datetime: req.body.datetime,
        },
      });
      return res.status(201).json(newReservation);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async upcomingReservations(req, res) {
    try {
      const upcomingReservations = await prisma.reservations.findMany({
        where: {
          customerId: +req.params.id,
          datetime: {
            gte: new Date(),
          },
        },
        include: {
          restaurant: true,
        },
      });
      return res.status(201).json(upcomingReservations);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
  async getAutoComplete(req, res) {
    try {
      const suggestedRestaurants = await prisma.restaurant.findMany({
        take: 10,
        where: {
          name: {
            startsWith: req.query.name,
          },
        },
        select: {
          name: true,
        },
      });
      const suggestionNames = suggestedRestaurants.map(
        (suggestion) => suggestion.name
      );
      return res.status(201).json({ suggestions: suggestionNames });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async getRestaurantRating(req, res) {
    try {
      const ratings = await prisma.rating.findMany({
        where: {
          restaurantId: req.query.restaurantId,
        },
      });
      const RatingData = ratings.map((ratingData) => ratingData.rating);
      return res.status(201).json(RatingData);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async setRestaurantRating(req, res) {
    try {
      const rating = await prisma.rating.upsert({
        where: {
          userId: req.body.id,
          restaurantId: +req.body.restaurantId,
        },
        create: {
          rating: req.body.rating,
          userId: req.body.id,
          restaurantId: +req.body.restaurantId,
        },
        update: {
          rating: req.body.rating,
        },
      });
      return res.status(201).json(rating);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
  async getImages(req, res) {
    try {
      const images = await prisma.images.findMany({
        where: {
          restaurantId: +req.query.restaurantId,
        },
      });
      const imagesUrl = images.map((image) => image.imageUrl);
      return res.status(201).json(imagesUrl);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getRatingByUser(req, res) {
    try {
      const ratings = await prisma.rating.findMany({
        where: {
          userId: req.params.id,
          restaurantId: req.query.restaurantId,
        },
      });
      const RatingData = ratings.map((ratingData) => ratingData.rating);
      return res.status(201).json(RatingData);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = RestaurantsController;
