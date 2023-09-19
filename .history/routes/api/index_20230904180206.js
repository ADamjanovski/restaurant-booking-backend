const router = require("express").Router();
const auth = require("../../middleware/auth");
const restaurants
const usersRoutes = require("./users");
const loginRoutes = require("./login");

router.use("/", loginRoutes);
router.use("/users", usersRoutes);

module.exports = router;
