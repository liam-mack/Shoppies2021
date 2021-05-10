/* eslint-disable */
import React from "react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import "./PrimaryComponent.scss";

// Versatile component used to dynamically render content based on props passed
// To be refactored and made more compact
function PrimaryComponent({
  bgColour,
  topLine,
  lightText,
  lightTextDescription,
  headline,
  description,
  description2,
  description3,
  buttonLabel,
  buttonColour,
  buttonLink,
  img,
  alt,
  imgStart,
  includesList,
  includesHeaders,
  header1,
  header2,
  listArray,
  logo,
  isStaff,
  title,
  subtitle,
  multipleButtons,
}) {
  return (
    <>
      <div
        className={
          bgColour
            ? `primary__hero-section ${bgColour}`
            : "primary__hero-section "
        }
      >
        <div className="componentContainer">
          <div
            className="row primary__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="column">
              <div className="primary__hero-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>
                {includesHeaders && (
                  <h1 className={lightText ? "subHeading" : "subHeading dark"}>
                    {header1}
                  </h1>
                )}
                <p
                  className={
                    lightTextDescription
                      ? "primary__hero-subtitle"
                      : "primary__hero-subtitle dark"
                  }
                >
                  {description}
                </p>
                {includesList && (
                  <ul className="styledList">
                    {listArray.map(function (i, idx) {
                      return (
                        <li className={`rainbow li${idx}`} key={idx}>
                          <p>{i}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {includesHeaders && (
                  <h1 className={lightText ? "subHeading" : "subHeading dark"}>
                    {header2}
                  </h1>
                )}
                <p
                  className={
                    lightTextDescription
                      ? "primary__hero-subtitle"
                      : "primary__hero-subtitle dark"
                  }
                >
                  {description2}
                </p>
                <p
                  className={
                    lightTextDescription
                      ? "primary__hero-subtitle"
                      : "primary__hero-subtitle dark"
                  }
                >
                  {description3}
                </p>
                {buttonLink && (
                  <Link to={buttonLink}>
                    <Button buttonColour={buttonColour}>{buttonLabel}</Button>
                  </Link>
                )}
              </div>
            </div>
            {img && (
              <div className="column">
                {img.map(function (i, idx) {
                  return (
                    <div className="primary__hero-img-wrapper" key={idx}>
                      <img
                        src={i}
                        alt={idx}
                        className={
                          isStaff ? "primary__pic-staff" : "primary__pic-img"
                        }
                      />
                      {title && (
                        <>
                          <p className="pictureHeading">{title[idx]}</p>
                          <p className="pictureSubtitle">{subtitle[idx]}</p>
                        </>
                      )}
                      {multipleButtons && (
                        <Button buttonColour={buttonColour}>
                          {buttonLabel}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {logo && (
              <div className="primary__hero-img-wrapper">
                <img src={logo} alt={logo} className="primary__hero-img" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrimaryComponent;
