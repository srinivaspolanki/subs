import React from "react";
import "../index.css";
import "./swapLoader.css";
import "./page.css";
export default function SwapLoader(text) {
  return (
    <div className="swapLoader hide-scrollbar">
      {text && (
        <div
          className="quote-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <div className="spinner"></div>
          <p
            className="quote"
            style={{
              fontSize: "1.2rem",
            }}
          >
            “{text.quote}”
          </p>
          <p
            className="movie-name"
            style={{
              fontSize: "0.8rem",
            }}
          >
            {text.movie}.
          </p>
        </div>
      )}
    </div>
  );
}
