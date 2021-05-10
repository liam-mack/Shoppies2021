import React from "react";
import "./Alert.scss";

// Alert banner to display when a movie has been nominated with link to IMDB page
function Alert({ alert, buttonClick }) {
  return (
    <div className="alert alert-success" role="alert">
      Your movie:
      {" "}
      <a href={`https://www.imdb.com/title/${alert.key}`} rel="noreferrer" target="_blank" className="alert-link">{alert.title}</a>
      {" "}
      has been nominated! Check out the IMDB.
      <button type="button" className="close" aria-label="Close" onClick={buttonClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default Alert;
