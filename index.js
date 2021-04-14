require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const author = require("./db/models/author");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// const { render } = require("ejs");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (email, password, done) {
    author.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

app.use(router);

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
