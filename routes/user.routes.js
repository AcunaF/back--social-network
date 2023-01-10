const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");

router.get("/user", UserController.userTesting);

module.exports = router;
