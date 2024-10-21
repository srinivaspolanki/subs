import React from "react";

function NotAvailable(lang) {
  var text;
  if (lang.language == "English") {
    text = `Sorry there are no subtitles available for this  film yet! `;
  } else {
    text = `Sorry there are no ${lang.language} subtitles available for this film yet!`;
  }

  return (
    <div
      className="quote-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p
        className="quote"
        style={{
          marginTop: "20px",
          fontSize: "1.2rem",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default NotAvailable;
