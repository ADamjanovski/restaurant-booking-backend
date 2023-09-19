const router = require("express").Router();
const auth = require("../../middleware/auth");

const usersRoutes = require("./users");

const loginRoutes = require("./login");

router.use("/items", itemsRoutes);
// router.use(auth);
router.use("/orders", ordersRoutes);
router.use("/", loginRoutes);
router.use("/users", usersRoutes);

module.exports = router;
