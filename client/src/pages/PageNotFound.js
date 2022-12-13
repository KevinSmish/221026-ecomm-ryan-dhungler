import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ textAlign: "center" }}
    >
      <div>
        <h4>404 | Page not found</h4>
        <img
          style={{
            width: "100%",
            height: "20rem",
            objectFit: "contain",
            marginTop: "1rem",
          }}
          src="/images/not-found.png"
          alt="Not-found"
        />
        <Link
          to="/"
          className="text-decoration-none"
          style={{ color: "rgb(255 255 255)" }}
        >
          <button
            style={{
              backgroundColor: "rgb(21 128 61)",
              color: "white",
              paddingLeft: "9rem",
              paddingRight: "9rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              marginTop: "1.25rem",
              borderRadius: "0.25rem",
            }}
          >
            Home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
