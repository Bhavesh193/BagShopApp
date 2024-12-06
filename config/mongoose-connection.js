const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/bagShopApp")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("There is Some Error While connecting to the database : ", err);
  });

module.exports = mongoose.connection;
