require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const models = require("./db/models");
// const flash = require("connect-flash");
const flash = require("express-flash");

// const { render } = require("ejs");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

//models.sequelize.sync({ force: true }).then(() => console.log("done"));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
