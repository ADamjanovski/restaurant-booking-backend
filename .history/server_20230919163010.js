require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { S3Client } = require("@aws-sdk/client-s3-node");
// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));

const corsOptions = {
  origin: "http://127.0.0.1:5174",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies or authorization headers if needed
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
console.log("server 3 ")
app.use(routes);
console.log("server 4 ")
app.listen(process.env.PORT, () => console.log("Server has started"));
