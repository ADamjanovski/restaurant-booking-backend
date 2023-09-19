const router = require("express").Router();
const auth = require("../../middleware/auth");
const restaurantsRoutes = require("./restaurants");
const usersRoutes = require("./users");
const loginRoutes = require("./login");
const dashboardRoutes = require("./dashboard");
router.use("/", loginRoutes);
router.use("/users", usersRoutes);
router.use("/restaurants", restaurantsRoutes);
router.use("/dashboard", restaurantsRoutes);
module.exports = router;
