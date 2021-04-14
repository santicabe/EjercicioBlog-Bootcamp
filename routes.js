const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");

const { article, coment, Author } = require("./db/models");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      //console.log("szdfsadfasd", email, password);
      // Author.findOne({ where: { email: email } }, function (err, user) {
      //   console.log("AAasdAAAAAA");
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false, { message: "Incorrect username." });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: "Incorrect password." });
      //   }
      //   return done(null, user);
      // });
      var user = await Author.findOne({
        where: {
          email: email,
        },
      });
      //console.log(user);
      // if (user == null) {
      //   return done(null, false, { message: "Incorrect email." });
      // }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: "Incorrect password." });
      // }
      // return done(null, user);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password != password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
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
    failureFlash: false,
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
});

// e. [GET] http://localhost:3000/logout.

router.get("/administrador", isLoggedIn, admin.adminList);

router.post("/administrador", isLoggedIn, admin.createArticle);

router.get("/delete/:id", isLoggedIn, admin.deleteArticle);

router.post("/administrador/update", isLoggedIn, admin.updateArticle);

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

module.exports = router;
