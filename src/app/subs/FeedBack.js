import React, { useState } from "react";

const FeedbackComponent = () => {
  const [userResponse, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setIsSending(true);
    setMessage("");

    try {
      // Replace 'https://api.example.com/feedback' with your actual API endpoint
      const id = localStorage.getItem("id");
      if (userResponse) {
        fetch(`/api/tracker`, {
          method: "POST", // Using POST to send data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            moviename: title,
            year: year,
            response: userResponse,
          }),
        });
      }

      if (response.ok) {
        setMessage("Feedback sent successfully!");
        setInputValue("");
      } else {
        setMessage("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        fontWeight: "bold",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: "0 0 10px 0",
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        how do you know this site?
      </p>
      <input
        type="text"
        value={userResponse}
        placeholder="whattowatch?"
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: "200px",
          padding: "5px",
          marginBottom: "10px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "3px",
          fontSize: "14px",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isSending}
        style={{
          padding: "5px 10px",
          backgroundColor: "#fff",
          width: "200px",
          color: "black",
          fontWeight: "bold",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          padding: "5px",
          fontSize: "14px",
        }}
      >
        {isSending ? "sending..." : "send"}
      </button>
      {message && (
        <p
          style={{
            margin: "10px 0 0 0",
            color: "black",
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FeedbackComponent;
