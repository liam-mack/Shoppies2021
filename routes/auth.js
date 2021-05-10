const router = require("express").Router();
const User = require("../models/user");
const passport = require("../middleware/passport");
const isAuthenticated = require("../middleware/isAuthenticated");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), async (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    username: req.user.username,
    id: req.user.id,
  })
});

// Route for signing up a user. 
// If the user is created successfully, proceed to log the user in otherwise send back an error
router.post("/signup", async (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(() => {
        res.json(req.user);
      })
      .catch((err) => {
        res.status(401).json({
          err,
        });
      });
  });
  
  router.get("/user", isAuthenticated, async (req, res) => {
    res.json(req);
  });
  
  module.exports = router;
