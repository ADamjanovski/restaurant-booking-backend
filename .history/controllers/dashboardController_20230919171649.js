require("dotenv").config();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const { s3 } = require("../server");
const { PutObjectCommand } = require("@aws-sdk/client-s3-node");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
class DashboardController {
  async index(req, res) {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      if (+req.query.myCursor === 0) {
        const restaurants = await prisma.restaurantUser.findMany({
          take: 10,
          where: {
            role: "PARTNER",
          },
          include: {
            restaurant: true,
          },
        });
        return res.status(200).json(restaurants);
      } else {
        const restaurants = await prisma.restaurantUser.findMany({
          take: 10,
          skip: 1,
          where: {
            role: "PARTNER",
          },
          myCursor: +req.query.myCursor,
        });
        return res.status(200).json(restaurants);
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      const newUser = await prisma.restaurantUser.create({
        data: {
          name: req.body.name,
          username: req.body.username,
          restaurant: {
            create: {
              name: req.body.name,
              email: req.body.email,
              logo: req.body.logo,
              scoreOfRating: 0,
              numberOfRating: 0,
              numberOfTables: +req.body.numberOfTables,
              Number: req.body.number,
            },
          },
          email: req.body.email,
          number: req.body.number,
          password: hashedPassword,
          role: req.body.role,
        },
      });
      // const newUser = await user.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
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
      return res.status(200).json(updatedUser);
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
          customer: true,
        },
      });
      return res.status(200).json(upcomingReservations);
    } catch (err) {
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
      return res.status(200).json(updatedStatus);
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
        restaurantId: user.restaurantId,
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
        take: 10,
        skip: req.params.myCursor == undefined ? 0 : 1,
        where: {
          status: "CONFIRMED",
          restaurantId: +req.params.id,
          datetime: {
            lte: new Date(),
          },
        },
        include: {
          customer: true,
        },
        myCursor: req.params.myCursor == undefined ? 0 : +req.params.myCursor,
      });
      return res.status(201).json(pastReservations);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getTables(req, res) {
    try {
      const tables = await prisma.tables.findMany({
        take: 10,
        skip: req.params.myCursor == undefined ? 0 : 1,
        where: {
          restaurantId: +req.params.id,
        },
        myCursor: req.params.myCursor == undefined ? 0 : +req.params.myCursor,
      });
      return res.status(201).json(tables);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async createTables(req, res) {
    try {
      const table = await prisma.tables.create({
        data: {
          tableNumber: +req.body.tableNumber,
          restaurantId: +req.body.id,
          numberOfSeats: +req.body.numberOfSeats,
        },
      });
      return res.status(201).json(table);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteTable(req, res) {
    try {
      const table = await prisma.tables.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.status(204);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          restaurant: {
            some: {
              id: {
                equals: +req.params.id,
              },
            },
          },
        },
      });
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async addCategories(req, res) {
    try {
      data = JSON.parse(req.query.categories);

      for (let i = 0; i < data.length; i++) {
        const categories = await prisma.categories.create({
          data: {
            name: data[i],
            restaurant: {
              connect: { id: +req.params.id },
            },
          },
        });
      }
      return res.status(204);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = primsa.categories.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.status(204);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async uploadImage(req, res) {
    const bucket = process.env.BUCKET;
    const params = {
      Bucket: bucket,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    // try {
    //   const image = await prisma.image.create({
    //     data: {
    //       imageUrl: req.query.imageUrl,
    //       restaurantId: req.query.id,
    //     },
    //   });
    //   return res.status(201).json(image.imageUrl);
    // } catch (err) {
    //   return res.status(500).json({ message: err.message });
    // }
  }

  async deleteImage(req, res) {
    try {
      const image = await prisma.image.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.status(204);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getPartnershipRequest(req, res) {
    try {
      const requests = await prisma.partnerRequest.findMany({
        take: 10,
        skip: req.params.myCursor == undefined ? 0 : 1,
        myCursor: req.params.myCursor == undefined ? 0 : +req.params.myCursor,
      });
      return res.status(200).json(requests);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DashboardController;
