import axios from "axios";

require("dotenv").config();

// Define OMDB api constants
const APIKEY = "ca5d47fc";
const BASEURL = "https://www.omdbapi.com/?s=";

export default {
  async getUser() {
    return axios.get("/user");
  },

  async signup(data) {
    return axios.post("/auth/signup", data);
  },

  async getNominations() {
    try {
      const response = await axios.get("/api/nominations");
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // Get all movies
  async getMovies() {
    try {
      const response = await axios.get("/api/movies");
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Search OMDB api with search value
  async searchMovies(search) {
    try {
      const response = await axios.get(`${BASEURL}${search}&apikey=${APIKEY}`);
      // If no results are found then return false
      if (response.data.totalItems === 0) {
        return false;
      }

      // Get current list of saved movies
      // const totalNominations = await this.getNominations();
      // console.log(totalNominations);
      const savedMovies = await this.getMovies();

      // Filter search results for any movies saved and map select data into a new object
      const movies = response.data.Search.filter(
        (item) => !savedMovies.some((e) => e.poster === item.Poster),
      )
        .filter((item) => item.Type === "movie")
        .map((element) => ({
          key: element.imdbID,
          title: element.Title,
          poster: element.Poster,
          year: element.Year,
        }));
      return movies;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Saves a movie to the user database
  async saveMovies(movie) {
    try {
      const response = await axios.post("/api/movies", movie);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Deletes the movie with the given id
  async deleteMovie(id) {
    try {
      const response = await axios.delete(`/api/movies/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
