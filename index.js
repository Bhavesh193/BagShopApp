const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const userRouter = require("./routes/usersRouter");
const ownerRouter = require("./routes/ownerRouter");
const productsRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");

// Connections
const db = require("./config/mongoose-connection");

require("dotenv").config();

// MiddleWare
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(flash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    // secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use("/users", userRouter);
app.use("/owners", ownerRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(8000, () => console.log("Server Started"));
