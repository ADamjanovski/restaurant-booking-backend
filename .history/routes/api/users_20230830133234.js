const express = require("express");

const router = express.Router();

const UserController = require("../../controllers/userController");

const userController = new UserController();

router.get("/", (req, res) => userController.index(req, res));
router.get("/:id", userController.getUser, (req, res) =>
  userController.show(req, res)
);
router.post("/", (req, res) => userController.create(req, res));
router.patch("/:id", userController.getUser, (req, res) =>
  userController.patch(req, res)
);
router.delete("/:id", userController.getUser, (req, res) =>
  userController.delete(req, res)
);

module.exports = router;
