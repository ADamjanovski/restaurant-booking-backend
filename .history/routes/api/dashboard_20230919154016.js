const express = require("express");
const DashboardController = require("../../controllers/dashboardController");
const dashboardController = new DashboardController();
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: maxSize } });

router.get("/");
router.get("/upcomingReservations/:id/:myCursor", (req, res) =>
  dashboardController.upcomingReservations(req, res)
);
router.get("/pastReservations/:id/:myCursor", (req, res) =>
  dashboardController.pastReservations(req, res)
);
router.get("/restaurants", (req, res) => dashboardController.index(req, res));
router.get("/tables/:id/:myCursor", (req, res) =>
  dashboardController.getTables(req, res)
);
router.get("/:id", auth, (req, res) =>
  dashboardController.getCategories(req, res)
);

router.post("/createTables", (req, res) =>
  dashboardController.createTables(req, res)
);
router.post("/", (req, res) => dashboardController.create(req, res));
router.post("/login", (req, res) => dashboardController.login(req, res));
router.post("/tables", auth, (req, res) =>
  dashboardController.createTables(req, res)
);
router.post("/categories/:id", auth, (req, res) =>
  dashboardController.addCategories(req, res)
);
router.post("/image", auth, (req, res) =>
  dashboardController.uploadImage(req, res)
);

router.post("/upload/:id", upload.single("image"), (req, res) =>
  dashboardController.uploadImage(req, res)
);

router.patch("/updateStatus", auth, (req, res) =>
  dashboardController.updateStatus(req, res)
);
router.patch("/updatePassword", auth, (req, res) =>
  dashboardController.UpdatePassword(req, res)
);

router.delete("/image/:id", auth, (req, res) =>
  dashboardController.deleteImage(req, res)
);
router.delete("table/:id", auth, (req, res) =>
  dashboardController.deleteTable(req, res)
);
router.delete("category/:id", auth, (req, res) =>
  dashboardController.deleteCategory(req, res)
);
module.exports = router;
