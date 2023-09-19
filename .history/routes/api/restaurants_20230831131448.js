const express = require("express");
const Restaurant=require("../../models/Restaurants");

const router=express.Router();
const userController = new UserController();

router.get("/")