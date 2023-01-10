const publicationTesting = (req, res) => {
  return res.status(200).json({
    message: "message sent from publication.controllers.js",
  });
};

module.exports = {
  publicationTesting,
};
