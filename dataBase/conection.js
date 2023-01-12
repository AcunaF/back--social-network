const mongoose = require("mongoose");

connection = async () => {
  try {
    await mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://localhost:27017/red-social", {
      useNewUrlParser: true,
    });

    console.log("Connected to BDD : red-social");
  } catch (e) {
    console.log(error);
    throw new Error("could not connect to the BDD");
  }
};

module.exports = connection;
