const express = require("express");
const router = express.Router();
const hommeController = require("../controllers/home_controller");

router.get("/", hommeController.home);
router.get("/project", hommeController.project);
router.get("/about", hommeController.about);
router.use("/users", require("./users"));

module.exports = router;
