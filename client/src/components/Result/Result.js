import React from "react";
import "./Result.scss";

// Main result container to display search results and nominations
function Result({ movie, buttonClick, type }) {
  // ES6 Destructure movie data
  const {
    title,
    year,
    poster,
    key,
  } = movie;

  return (
    <div className="movieCard col-12 col-sm-6 col-md-6 col-lg-4">
      <div className="card h-100 mb-4">
        <div className="card-header">
          <h5 className="card-title m-0 p-0 font-weight-bolder">{title}</h5>
        </div>
        <div className="card-body text-left">
          {key ? (
            <a
              href={`https://www.imdb.com/title/${key}`}
              rel="noreferrer"
              target="_blank"
            >
              <img className="resultsImg" src={poster} alt="movie poster" />
            </a>
          ) : (
            <img className="resultsImg" src={poster} alt="movie poster" />
          )}
          <div className="promotion-promo">{year}</div>
          <div className="promotion-price">
            <div className="promotion-price-desc">2021</div>
            <div className="promotion-price-text">Shoppy</div>
          </div>
        </div>
        {buttonClick && (
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => buttonClick(movie)}
            >
              {type}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
