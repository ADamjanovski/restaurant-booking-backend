const router = require("express").Router();
const auth = require("../../middleware/auth");
const restaurantsRoutes=require("./restaurants");
const usersRoutes = require("./users");
const loginRoutes = require("./login");

router.use("/", loginRoutes);
router.use("/users", usersRoutes);
router.use("/restau")
module.exports = router;