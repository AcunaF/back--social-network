const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const check = require("../middlewares/auth");

router.get("/usuario", check.auth, UserController.userTesting);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
//privadas

router.get("/profile/:id", UserController.profile); //check.auth,

module.exports = router;
