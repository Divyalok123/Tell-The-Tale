const express = require("express");
const router = express.Router();
const hommeController = require("../controllers/home_controller");

router.get("/", hommeController.home);
router.get("/project", hommeController.project);
router.get('/about', hommeController.about);
router.use("/users", require("./users"));
router.use('/posts', require('./post'));

//for any further routes, access from here
//router.use('/routerName'. require('./routerFile'));

module.exports = router;
