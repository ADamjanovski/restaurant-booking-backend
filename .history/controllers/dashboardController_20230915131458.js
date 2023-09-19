const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
class DashboardController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      // const user = await User.find();
      const user = await prisma.restaurantUser.findMany();
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // const user = new User({
    //   name: req.body.name,
    //   lastName: req.body.lastName,
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hashedPassword,
    // });
    try {
      const newUser = await prisma.restaurantUser.create({
        data: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        },
      });
      // console.log(newUser);
      // const newUser = await user.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUser(req, res, next) {
    // let user;
    try {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     id: +req.params.id,
      //   },
      // });
      // if (user == null) {
      //   return res.status(404).json({ message: "Cannot find user" });
      // } else {
      return res.status(200).json(req.user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    // res.user = user;
    // next();
  }

  async UpdatePassword(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
      const updatedUser = await prisma.restaurantUser.update({
        where: {
          id: req.body.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(201).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async upcomingReservations(req, res) {
    try {
      const upcomingReservations = await prisma.reservations.findMany({
        where: {
          restaurantIdId: +req.params.id,
          datetime: {
            gte: new Date(),
          },
        },
        include: {
          user: true,
        },
      });
      return res.status(201).json(upcomingReservations);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DashboardController;
