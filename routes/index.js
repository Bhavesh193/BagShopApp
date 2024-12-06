const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggesIn");
const productModel = require("../models/productmodel");
const userModel = require("../models/usermodel");

router.get("/", (req, res) => {
  let error = req.flash("Error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  // console.log(JSON.stringify(user.cart, null, 2));

  // res.send("cart");
  res.render("cart", { user });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log("USer => ", user);

  user.cart.push(req.params.productid);
  console.log("  user.cart.=> ", user.cart);

  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
