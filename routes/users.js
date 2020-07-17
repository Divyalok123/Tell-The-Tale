const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/create", usersController.create);

//using passport as the middleware
router.post("/login", passport.authenticate("local", { failureRedirect: "/users/sign-in" }), usersController.login);
module.exports = router;
