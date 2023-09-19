require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const helmet = require("helmet");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT, () => console.log("Server has started"));
const router = require("express").Router();
const apiRoutes = require("./api");

const auth = require("../middleware/auth");

const api = "/api";

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json("No API route found"));

module.exports = router;