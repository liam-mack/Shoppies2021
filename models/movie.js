const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define movie object paramaters
const movieSchema = new Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
      require: "Enter movie's imdbKey",
    },
    title: {
      type: String,
      trim: true,
      required: true,
      require: "Enter movie's title",
    },
    year: {
      type: String,
      trim: true,
      required: true,
      require: "Enter year of release",
      default: "Not recorded",
    },
    poster: {
      type: String,
      trim: true,
      required: false,
      require: "Enter the movies's poster url",
      default: "No Poster Image"
    },
    nominationCount: {
      type: Number,
      default: 1 
    }
  },
);

// Export models
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

