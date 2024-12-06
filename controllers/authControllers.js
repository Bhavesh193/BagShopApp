const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

let authController = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.send("All fields are required for registration");
    }
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("Email already exist");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(user);
        // let token = jwt.sign({ email, id: user._id }, "heyhey");
        res.cookie("token", token);
        // res.send(user);
        res.send("User Created Successfully");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

let loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) return res.send("Email or Password is incorrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
      // res.send("You can Login ");
    } else {
      return res.send("Email or Password is incorrect");
    }
  });
};

let logout = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
module.exports = { authController, loginUser, logout };
