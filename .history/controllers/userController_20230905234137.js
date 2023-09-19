const User = require("../models/User");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
class UserController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      const user = await User.find();
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
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          lastName: req.body.lastName,
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
      const user = await prisma.user.findUnique({
        where: {
          id: req.body.id,
        },
      });
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }else{}
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    // res.user = user;
    // next();
  }
}

module.exports = UserController;
