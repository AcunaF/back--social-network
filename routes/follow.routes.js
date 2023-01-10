const express = require("express");
const router = express.Router();
const FollowController = require("../controller/follow.controller");

router.get("/follow", FollowController.followTesting);

module.exports = router;
