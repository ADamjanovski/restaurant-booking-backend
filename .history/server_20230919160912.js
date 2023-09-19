require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser')
const { S3Client } = require("@aws-sdk/client-s3-node/S3Client");
// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));
BUCKET=restaurant-booking-project
BUCKET_REGION=eu-central-1  
ACCESS_KEY=AKIAXVVAP42JCUAYEWVU
SECRET_ACCESS_KEY=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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5174',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies or authorization headers if needed
  };
app.use(cors(corsOptions));

app.use(routes);

app.listen(process.env.PORT, () => console.log("Server has started"));
