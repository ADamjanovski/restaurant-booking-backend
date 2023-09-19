const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
let myCursor;
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
class DashboardController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      if (req.body.myCursor === 0) {
        const restaurants = await prisma.restaurantUser.findMany({
          take: 10,
          where: {
            role: "PARTNER",
          },
        });
        console.log(restaurants);
        return res.status(201).json(restaurants);
      } else {
        const restaurants = await prisma.restaurantUser.findMany({
          take: 10,
          skip: 1,
          where: {
            role: "PARTNER",
          },
          myCursor: req.body.myCursor,
        });
        return res.status(201).json(restaurants);
      }
      // const user = await User.find();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let restaurant = undefined;
    if (req.body.role === "PARTNER") {
      restaurant = await prisma.restaurant.findUnique({
        where: {
          email: req.body.email,
        },
      });
    }

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
          restaurantId: restaurant==,
          email: req.body.email,
          number: req.body.number,
          password: hashedPassword,
          role: req.body.role,
        },
      });
      // console.log(newUser);
      // const newUser = await user.save();
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
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
          restaurantId: +req.params.id,
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
  async updateStatus(req, res) {
    try {
      const updatedStatus = await prisma.reservations.update({
        where: {
          id: req.body.id,
        },
        data: {
          status: req.body.status,
        },
      });
      return res.status(201).json(updatedStatus);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async createTables(req, res) {
    try {
      return res.status(200).json(datas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async login(req, res) {
    let user;
    if (req.body.username != null) {
      user = await prisma.restaurantUser.findUnique({
        where: {
          username: req.body.username,
        },
      });
    }
    if (user == null) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ name: req.body.username });
      const refreshToken = jwt.sign(
        { name: req.body.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }

  async pastReservations(req, res) {
    try {
      const pastReservations = await prisma.reservations.findMany({
        where: {
          restaurantId: +req.params.id,
          datetime: {
            lte: new Date(),
          },
        },
        include: {
          user: true,
        },
      });
      return res.status(201).json(pastReservations);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DashboardController;
