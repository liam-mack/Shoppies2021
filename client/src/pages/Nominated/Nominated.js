import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import API from "../../utils/API";
import Alert from "../../components/Alert/Alert";
import BannerImage from "../../components/BannerImage/BannerImage";
import Result from "../../components/Result/Result";
import Nav from "../../components/NavTabs/NavTabs";
import Footer from "../../components/Footer/Footer";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";

const socket = io();

// Nomination page tracking individual user nominations
function Nominated() {
  // Setting our component's initial state
  const [movies, setMovies] = useState([]);

  // Track any alerts emitted by socketio
  const [alert, setAlert] = useState();

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

  // Load movies and store them with setMovies
  useEffect(async () => {
    setMovies(await API.getMovies());
  }, []);

  // Delete from mongoDB using unique _id syntax, attached to Redux dispatcher to store state
  async function handleDelete(movie) {
    await API.deleteMovie(movie._id);
    setMovies(movies.filter((element) => element !== movie));
    dispatch({ type: "DECREMENT" });
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Nav />
      <BannerImage banner="NominationsBanner" alt="Nominations banner" title="" desc="" name="" />
      {alert ? <Alert alert={alert} buttonClick={closeAlert} /> : null}
      <h1 className="nominationCount text-center">
        <i className="fas fa-download" />
        Your Picks -
        {" "}
        {count}
        /5 Selected
      </h1>
      <hr />
      {/* If there are movies to display then create a result component for each */}
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <div className="col-lg-12">
              <div className="card-deck">
                {movies.length ? (
                  movies.map((element) => (
                    <Result
                      key={element.imdbID}
                      movie={element}
                      buttonClick={handleDelete}
                      type="REMOVE"
                    />
                  ))
                ) : (
                  <h4 className="text-center">No Saved Movies</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Nominated;
