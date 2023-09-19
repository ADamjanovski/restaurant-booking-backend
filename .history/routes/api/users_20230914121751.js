const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");

const UserController = require("../../controllers/userController");

const userController = new UserController();

router.get("/", (req, res) => userController.index(req, res));
router.get("/user", auth, (req, res) => userController.getUser(req, res));
router.post("/", (req, res) => userController.create(req, res));
router.patch("/:id", userController.getUser, (req, res) =>
  userController.patch(req, res)
);
router.delete("/:id", userController.getUser, (req, res) =>
  userController.delete(req, res)
);
router.patch("/updatePassword", auth, (req, res) =>
  userController.UpdatePassword(req, res)
);

module.exports = router;
