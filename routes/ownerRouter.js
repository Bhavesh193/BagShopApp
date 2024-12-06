const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownermodel");

router.get("/", (req, res) => {
  res.send("OwnerRouter Server is working");
});

router.post("/create", async (req, res) => {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .status(505)
      .send("You dont have permission to create a new owner");
  }

  let { fullname, email, password } = req.body;
  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });

  res.send(createdOwner);
});

router.get("/admin", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
