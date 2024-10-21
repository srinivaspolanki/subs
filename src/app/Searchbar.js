"use client"; // Needed for client-side interactions
import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { searchMovies } from "../actions/actions"; // Assuming this is a server action
import "./index.css";
import RecentDownloads from "./recent";
import "./globals.css";
const SearchBar = ({ initialRandomMovie, recentdownloads }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomMovie, setRandomMovie] = useState(initialRandomMovie);
  const [dontshowdata, setdontshowdata] = useState(false);
  const abortControllerRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);

        // Cancel the ongoing request if exists
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for the current request
        abortControllerRef.current = new AbortController();

        try {
          const results = await searchMovies(query);
          setSearchResults(results.slice(0, 5)); // Take only 5 results
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Request was aborted");
          } else {
            console.log(error);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setSearchResults([]);
      setdontshowdata(true);
    } else {
      setdontshowdata(false);
      handleSearch(query);
    }
  };

  const style = {
    backgroundImage: `linear-gradient(to right,transparent, transparent,rgb(20,24,28)), url(https://image.tmdb.org/t/p/original${randomMovie?.poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      {randomMovie && (
        <div
          className="random"
          style={{
            position: "absolute",
            top: "8%",
            right: "3%",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          {randomMovie.title}
          <div
            style={{
              fontSize: "0.8REM",
              textAlign: "end",
            }}
          >
            {randomMovie.year.split("-")[0]}
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "5%",
          width: "75px",
          height: "140px",
          background: "#f1c40f",
        }}
      >
        <span
          style={{
            position: "absolute",
            color: "black",
            bottom: "0",
            fontWeight: "bold",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "22PX",
            zIndex: "20",
          }}
        >
          SUBS
        </span>
      </div>
      <div
        className="inputContaineron"
        style={{
          minHeight: "45vh",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          className="description"
          style={{ marginBottom: "20px", fontSize: "26px" }}
        >
          Find perfect subtitles for any movie{" "}
        </div>
        <form className="formContainer" onSubmit={(e) => e.preventDefault()}>
          <input
            className="inputbar"
            type="text"
            style={{
              padding: "7px",
              fontSize: "16px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              outline: "nine",
              background: "white",
              color: "black",
              border: "0px solid white",
              width: "500px",
            }}
            required
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && searchQuery.length === 0) {
                setSearchResults([]);
                setdontshowdata(true);
                if (abortControllerRef.current) {
                  abortControllerRef.current.abort(); // Abort the fetch
                }
              }
            }}
            placeholder="Search for a movie..."
          />
          <button
            type="submit"
            className="btnf"
            style={{
              padding: "7px",
              border: "none",
              fontSize: "16PX",
              width: "80px",
              background: "#f1c40f",
              color: "black",
              fontWeight: "bold",
            }}
            onClick={(e) => e.preventDefault()}
          >
            Search
          </button>
        </form>
      </div>
      {error && <p>Error: {error}</p>}
      {searchResults.length > 0 && !dontshowdata && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {searchResults.map((movie, index) => (
            <Link
              className="sublinks"
              style={{
                width: "580px",
                padding: "10px",
                boxSizing: "border-box",
                background: "white",
                color: "black",
                margin: "5px",
              }}
              key={index}
              href={`/subs?q=${movie.id}&bg=${movie.backdrop_path}&y=${
                movie?.release_date?.split("-")[0] || ""
              }&p=${movie.poster_path}`}
            >
              {movie.title} ({movie?.release_date?.split("-")[0] || ""})
            </Link>
          ))}
        </div>
      )}
      <RecentDownloads downloads={recentdownloads} />
    </div>
  );
};

export default SearchBar;
