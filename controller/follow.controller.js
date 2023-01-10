const followTesting = (req, res) => {
  return res.status(200).json({
    message: "message sent from follow.controllers.js",
  });
};

module.exports = {
  followTesting,
};
