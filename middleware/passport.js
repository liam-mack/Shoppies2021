const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// Telling passport we want to use a Local Strategy.
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    (user, password, done) => {
      // When a user tries to sign in this code runs
      User.findOne({
        username: user
      }).then((dbUser) => {
        // If there's no user with the given username
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }
        // If there is a user with the given username, but the password the user gives us is incorrect
        if (!dbUser.validatePassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    },
  ),
);

// In order to help keep authentication state across HTTP requests,
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
