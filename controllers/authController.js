const { article, coment, Author } = require("../db/models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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
          if (!bcrypt.compare(password, user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        })
        .catch((err) => console.log(err));
    }
  )
);

// bcrypt.compare("B4c0//", hash).then((res) => {
//   // res === true
// });

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

const isLoggedIn = (req, res, next) => {
  // esta función es la que deja pasar o no a las rutas privadas
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

const login = (req, res) => {
  res.render("login");
};

const authenticate = () => {
  passport.authenticate("local", {
    successRedirect: "/administrador",
    failureRedirect: "/login",
    failureFlash: true,
  });
};

const store = (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const [user, created] = await Author.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
        },
      });

      if (created) {
        req.login(user, () => res.redirect("/administrador"));
      } else {
        res.redirect("back");
      }
    });
  });
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports = { isLoggedIn, login, authenticate, store, logout };
