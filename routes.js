const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");

const { article, coment, Author } = require("./db/models");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallBack: true,
    },
    function (email, password, done) {
      Author.findOne({ where: { email: email } })
        .then(function (user) {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (user.password != password) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        })
        .catch((err) => console.log(err));
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  Author.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

router.get("/gracias", (req, res) => {
  res.render("gracias");
});

router.get("/home", home.showHome);

router.get("/articulo/:id", home.showArticle);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/administrador",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/register", (req, res) => res.render("register"));

router.post("/register", async (req, res) => {
  const [user, created] = await Author.findOrCreate({
    // Ver opciones en Sequelize.
  });
  if (created) {
    req.login(user, () => res.redirect("/administrador"));
  } else {
    res.redirect("back");
  }

  User.findOne({
    where: {
      email: email,
    },
  }).then(function (user) {
    if (user) {
      return done(null, false, {
        message: "That email is already taken",
      });
    } else {
      var userPassword = generateHash(password);
      var data = {
        email: email,
        password: userPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      };
      User.create(data).then(function (newUser, created) {
        if (!newUser) {
          return done(null, false);
        }
        if (newUser) {
          return done(null, newUser);
        }
      });
    }
  });
  //
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/administrador", isLoggedIn, admin.adminList);

router.post("/administrador", isLoggedIn, admin.createArticle);

router.get("/delete/:id", isLoggedIn, admin.deleteArticle);

router.post("/administrador/update", isLoggedIn, admin.updateArticle);

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

module.exports = router;
