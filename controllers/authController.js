const { Article, Coment, Author } = require("../db/models");
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
        .then(async function (user) {
          if (!user) {
            return done(null, false, {
              message: "Incorrect credentials bolso gallina.",
            });
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return done(null, false, {
              message: "Incorrect credentials bolso gallina.",
            });
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

const isLoggedIn = (req, res, next) => {
  // esta función es la que deja pasar o no a las rutas privadas
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

const login = (req, res) => {
  res.render("login");
};

const authenticate = passport.authenticate("local", {
  successRedirect: "/administrador",
  failureRedirect: "/login",
  failureFlash: true,
});

const register = (req, res) => res.render("register");

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

const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: 791443398474487,
      clientSecret: "7fe9bca965cb582f378932168760cbe4",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "email", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await Author.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
          },
        });
        done(null, user[0]);
      } catch (err) {
        done(err);
      }
    }
  )
);

module.exports = { isLoggedIn, login, authenticate, register, store, logout };
