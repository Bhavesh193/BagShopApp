const express = require("express");
const router = express.Router();
const {
  authController,
  loginUser,
  logout,
} = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("UserRouter Server is working");
});

router.post("/register", authController);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
