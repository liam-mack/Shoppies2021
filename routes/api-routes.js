/* eslint-disable */
// Require Mongoose model
const router = require("express").Router();
// const Movie = require("../models/movie.js");
const User = require("../models/user");
const isAuthenticated = require('../middleware/isAuthenticated');

// Define api routes

// Return all user saved movies
router.get("/api/movies", isAuthenticated, async (req, res) => {
  User.findById(req.user._id).select('nominations -_id')
    .then((user) => res.json(user.nominations))
});

router.get("/api/nominations", isAuthenticated, async (req, res) => {
  User.findById(req.user._id).select('nominationCount -_id')
    .then((user) => res.json(user.nominationCount))
});


// Nominate: save a movie to db
// router.post("/api/movies", isAuthenticated, async (req, res) => {
//   User.findByIdAndUpdate(req.user._id, { $push: { nominations: req.body }})
//   .then((movie) => res.json(movie));
//   });

router.post("/api/movies", isAuthenticated, async (req, res) => {
  User.findById(req.user._id, function (err, user) {
    if (err) {
      return console.log(err);
    }
    user.addNom();
    user.save(function(err, editedUser){
      if(err){
        return console.log(err)
      }
      console.log(editedUser.nominationCount);
    });
  });
  User.findByIdAndUpdate(req.user._id, {
    $push: { nominations: req.body },
  }).then((movie) => res.json(movie));
});

// Remove nomination from user db
router.delete("/api/movies/:id", isAuthenticated, async (req, res) => {
  User.findById(req.user._id, function(err, user){
    if(err){
      return console.log(err)
    }
    user.nominations.pull(req.params.id)
    user.removeNom();
    user.save(function(err, editedUser){
      if(err){
        return console.log(err)
      }
      console.log(editedUser.nominationCount);
    })
  })
    .then((movie) => res.json(movie));
});

module.exports = router;
