const express = require("express");
const router = express.Router();
const PublicationController = require("../controller/publication.controller");

router.get("/publication", PublicationController.publicationTesting);

module.exports = router;
