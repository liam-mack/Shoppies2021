/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Alert from "../../components/Alert/Alert";
import API from "../../utils/API";
import BannerImage from "../../components/BannerImage/BannerImage";
import Nav from "../../components/NavTabs/NavTabs";
import Result from "../../components/Result/Result";
import Footer from "../../components/Footer/Footer";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";
import "./Search.scss";

const socket = io();


// Crux of the app, MVP was originally limited to Search page
function Search() {
  // Track search value and search results
  const [movies, setMovies] = useState();
  const [searchValue, setSearchValue] = useState();

  // Track any alerts emitted by socketio
  const [ioAlert, setAlert] = useState();

  // Handle an emitted message called saved and emit movie details
  useEffect(() => {
    socket.on("saved", (data) => {
      setAlert(data);
    });
  });

  // Set alert to null to dismount the component on click
  function closeAlert() {
    setAlert(null);
  }

  // Custom Redux library hooks to apply stored state throughout components
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  dispatch({ type: "SETUSER" });

  // Track value of input(search) box
  function handleInputChange(event) {
    const { value } = event.target;
    setSearchValue(value);
  }

  // Handles form submission and prevents refresh
  async function handleSubmit(event) {
    event.preventDefault();
    // Check if search value is null
    if (!searchValue) {
      console.log("Search value is empty");
      return;
    }
    // Set movies to the search results returned
    setMovies(await API.searchMovies(searchValue));
  }

  // Handles saving a movie to database
  async function handleSave(movie) {
    await API.saveMovies(movie);
    // Change the movie state so it rerenders and selected movie is removed
    setMovies(movies.filter((element) => element !== movie));
    // Emit a message to all other connected clients what movie was saved
    socket.emit("saved", movie);
    dispatch({ type: "INCREMENT" });
    // dispatch({ type: "SETUSER" });
  }

  function nominationAlert() {
    alert("Maximum nominations reached - remove items from your list to continue")
  }

  // Check the status of movies state
  function checkMovies() {
    // On first page load, it will be null
    if (movies === undefined) {
      return <h4 className="searchBegin">Search to Nominate</h4>;
    }
    // If no search results are found
    if (movies === false) {
      return <h4 className="searchBegin">No Results Found</h4>;
    }
    // If results are found then create a result component for each item
    // Pass in the search item and click handler for saving
    return movies.map((element) =>
      count < 5 ? (
        <Result
          key={element.imdbID}
          movie={element}
          buttonClick={handleSave}
          type="NOMINATE"
        />
      ) : (
        <Result
          key={element.imdbID}
          movie={element}
          buttonClick={nominationAlert}
          type="X"
        />
      )
    );
  }

  // Render our search page
  return (
    <>
      <ScrollToTopOnMount />
      <Nav />
      <BannerImage banner="SearchBanner" alt="Search banner" title="Search Movies!" desc="" name=""/>
      {ioAlert ? <Alert alert={ioAlert} buttonClick={closeAlert} /> : null}
      {/* Display a form with input box and submit button */}
      <form className="form-group">
        <input
          className="form-control"
          placeholder="Search Films..."
          onChange={handleInputChange}
        />
        <button
          className="btn btn-success"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>

      {/* Results portion of the page rendered after using the OMDB api */}
      <h1 className="text-center resultCount">Results: {5 - count} Nominations Remaining</h1>
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <div className="col-lg-12 col-xl-12">
              <div className="card-deck">{checkMovies()}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Export component
export default Search;
