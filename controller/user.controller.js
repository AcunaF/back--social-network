//testing
const userTesting = (req, res) => {
  return res.status(200).json({
    message: "message sent from user.controllers.js",
  });
};

module.exports = {
  userTesting,
};
