const router = require("express").Router();
const auth = require("../../middleware/auth");
const restaurantsRoutes=require("./restaurants");
const usersRoutes = require("./users");
const loginRoutes = require("./login");
const dashboardRoutes=req
router.use("/", loginRoutes);
router.use("/users", usersRoutes);
router.use("/restaurants" , restaurantsRoutes)
module.exports = router;
