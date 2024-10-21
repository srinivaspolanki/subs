"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "../index.css";
import "./page.css";
import SwapLoader from "./SwapLoader";
import NotAvailable from "./NotAvailable";
import Subswap from "./subshit";
import { searchMovies, findSubs } from "../../actions/actions";
import FeedbackComponent from "./FeedBack";

/******  32c72582-66fc-4b4b-9047-ffde2ed80740  *******/
function Subtitles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [lang, setLang] = useState({
    code: "EN",
    language: "English",
  });
  const [subtitlesLoading, setSubsLoading] = useState(false);
  const [realdata, setSubsData] = useState(null);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const poster = searchParams.get("p");
  const backdrop = searchParams.get("bg");

  const year = searchParams.get("y");

  const dailog = {
    quotes: [
      {
        movie: "Hacksaw Ridge",
        quote: "I'm not here to kill. I'm here to rescue.",
      },
      {
        movie: "Dallas Buyers Club",
        quote: "We all got somethin' to live for.",
      },
      {
        movie: "Whiplash",
        quote: "Are you sure you're giving 110%?",
      },
      {
        movie: "Schindler's List",
        quote: "Whoever saves one life, saves the world entire.",
      },
      {
        movie: "Forrest Gump",
        quote:
          "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      },
      {
        movie: "Breaking Bad",
        quote: "I am the one who knocks!",
      },

      {
        movie: "The Shawshank Redemption",
        quote:
          "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
      },
      {
        movie: "The Dark Knight",
        quote: "Why so serious?",
      },

      {
        movie: "Inception",
        quote: "You're extracting information from my subconscious?",
      },
      {
        movie: "Fight Club",
        quote:
          "The first rule of Fight Club is: you do not talk about Fight Club.",
      },
      {
        movie: "The Secret Life of Walter Mitty",
        quote:
          "The most courageous act is still to speak from your heart in a world that will try to silence it.",
      },
      {
        movie: "Hacksaw Ridge",
        quote: "Sometimes the bravest thing you can do is surrender.",
      },
      {
        movie: "Dallas Buyers Club",
        quote: "If you don't try, you'll never know.",
      },
      {
        movie: "Whiplash",
        quote: "Not quite my tempo.  A little slower, please. Hit me.",
      },
      {
        movie: "Schindler's List",
        quote: "The list is life.",
      },
      {
        movie: "Forrest Gump",
        quote: "Run, Forrest, run!",
      },

      {
        movie: "Terminator 2: Judgment Day",
        quote: "I'll be back.",
      },

      {
        movie: "Schindler's List (again)",
        quote:
          "It is a sin to kill a man. But is it less a sin to let a man die?",
      },

      {
        movie: "The Secret Life of Walter Mitty",
        quote: "If you never try, you'll never know what you're capable of.",
      },
      {
        movie: "Hacksaw Ridge",
        quote: "War isn't about winning. It's about survival.",
      },
      {
        movie: "Dallas Buyers Club",
        quote: "We gotta live life on our own terms.",
      },
      {
        movie: "Whiplash",
        quote: "Are you bleeding? You haven't begun to bleed.",
      },
      {
        movie: "Forrest Gump",
        quote:
          "Life is a box of chocolates. You never know what you're gonna get.",
      },
      {
        movie: "Breaking Bad",
        quote: "I am the danger.",
      },

      {
        movie: "The Big Lebowski",
        quote: "That rug really tied the room together.",
      },
      {
        movie: "Kill Bill: Vol. 2",
        quote: "The Bride doesn't need a reason.",
      },

      {
        movie: "The Dark Knight",
        quote: "Why do we fall? So we can learn to pick ourselves up.",
      },
      {
        movie: "The Lion King",
        quote: "Can you feel the love tonight?",
      },
      {
        movie: "The Social Network",
        quote:
          "You're not making friends. You're making enemies with benefits.",
      },

      {
        movie: "The Matrix",
        quote: "Ignorance is bliss.",
      },

      {
        movie: "The Shining",
        quote: "Winter. Spring. Summer. Fall. And winter again.",
      },
      {
        movie: "Fight Club",
        quote:
          "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
      },
      {
        movie: "The Shawshank Redemption",
        quote:
          "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
      },

      {
        movie: "Schindler's List",
        quote: "Power is death.",
      },

      {
        movie: "The Shining",
        quote: "Hello, darling.",
      },
      {
        movie: "Fight Club",
        quote:
          "The first rule of Fight Club is: you do not talk about Fight Club.",
      },
      {
        movie: "The Shawshank Redemption",
        quote: "Get busy livin', or get busy dyin'.",
      },

      {
        movie: "Back to the Future",
        quote: "Doc, we need to go back!",
      },
      {
        movie: "Terminator 2: Judgment Day",
        quote: "I'll be back.",
      },
      {
        movie: "Jurassic Park",
        quote: "Welcome to Jurassic Park.",
      },
      {
        movie: "Schindler's List",
        quote: "Whoever saves one life, saves the world entire.",
      },
    ],
  };

  useEffect((text) => {
    function dailogg(text) {
      const randquote = Math.floor(Math.random() * 39) + 1;

      const data = dailog.quotes[randquote];
      setText(data);
    }
    dailogg(text);
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setIsLoading(true);
      try {
        const results = await searchMovies(query);

        setSearchResults(results.slice(0, 5));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const movieId = q;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch subtitles data
      try {
        const subtitlesData = await findSubs(movieId, lang);

        setSubsData({
          data: subtitlesData,
          poster_path: poster,
          backdrop_path: backdrop,

          year,
          lang,
        });

        setSubsLoading(false);
      } catch (error) {
        console.log(error);
        // Handle error
      } finally {
      }
    };

    fetchData();
  }, [lang]);

  const languages = {
    EN: "English",

    ID: "Indonesian",

    FR: "French",

    IT: "Italian",

    ES: "Spanish",

    ZH: "Chinese",

    DE: "German",

    JA: "Japanese",

    KO: "Korean",

    RU: "Russian",
  };

  return (
    <div className="hide-scrollbar">
      {!realdata && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90svh",
          }}
        >
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
            <p className="quote">“{text.quote}”</p>
            <p className="movie-name">{text.movie}.</p>
          </div>
        </div>
      )}
      <div>
        <Toaster />
      </div>
      {realdata && realdata?.data?.status && (
        <div
          className="hide-scrollbar"
          style={{
            backgroundColor: "rgb(20,24,28)",
          }}
        >
          {realdata && (
            <>
              <div
                className="logo"
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
                  }}
                >
                  SUBS
                </span>
              </div>
              <div
                className="inputcontainer"
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  flexDirection: "column",
                  boxSizing: "border-box",
                }}
              >
                <form onSubmit={handleSearch} style={{}}>
                  <input
                    className="subsinputbar"
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
                      marginBottom: "10px",
                      width: "500px",
                    }}
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                        handleSearch(e);
                      }
                    }}
                    placeholder="Search for a  movie..."
                  />
                  <button
                    type="submit"
                    className="searchbtn"
                    style={{
                      padding: "7px",
                      border: "none",
                      fontSize: "16PX",
                      width: "80px",
                      background: "#f1c40f",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    onClick={async (e) => {
                      e.preventDefault();
                      await fetchMovies(searchQuery);
                    }}
                  >
                    Search
                  </button>
                </form>
                {error && <p>Error: {error.message}</p>}
                {searchResults.length > 0 && (
                  <>
                    {searchResults.map((movie, index) => (
                      <>
                        <Link
                          className="sublinks"
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: "white",
                            color: "black",
                            marginBottom: "5px",
                          }}
                          key={index}
                          target="_blank"
                          href={`/subs?q=${movie.id}&bg=${
                            movie.backdrop_path
                          }&y=${movie?.release_date?.split("-")[0] || ""}&p=${
                            movie.poster_path
                          }`}
                        >
                          {" "}
                          {movie?.title} ({movie?.release_date?.split("-")[0]})
                        </Link>
                      </>
                    ))}
                  </>
                )}
              </div>

              <div
                style={{
                  height: "56vh",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    background: `linear-gradient(to bottom, transparent, transparent,rgb(20,24,28))`,
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    height: "100%",
                  }}
                ></div>
                <div
                  className="backdrop"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, transparent,rgb(20,24,28)), url(https://image.tmdb.org/t/p/original${realdata.backdrop_path})`,
                    backgroundSize: "cover",
                    height: "55vh",
                  }}
                ></div>
              </div>
              <div
                className="infoContainer"
                style={{
                  display: "flex",
                  gap: "30px",
                  boxSizing: "border-box",
                  marginTop: "-100px",
                  marginLeft: "19%",
                }}
              >
                {" "}
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500${realdata.poster_path}`}
                  alt="Poster"
                  style={{
                    height: "210px",
                    width: "150px",
                  }}
                />
                <span
                  className="moviename"
                  style={{
                    fontWeight: "bold",
                    fontSize: "2.6rem",
                  }}
                >
                  {realdata.data.results[0].name}
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                      color: "lightgray",
                    }}
                    className="year"
                  >
                    {realdata.year}
                  </div>
                  <div
                    className="dontShowIthereInMobile hide-scrollbar"
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div className="lang-keys hide-scrollbar">
                      {Object.entries(languages).map(([code, langu]) => (
                        <span
                          key={code}
                          className="language-details"
                          style={{
                            backgroundColor:
                              langu == lang.language ? "white" : "#f1c40f",
                            color: langu == lang.language ? "black" : "black",
                          }}
                          onClick={() => {
                            setSubsLoading(true);

                            setLang({ code: code, language: langu });
                          }}
                        >
                          {langu}
                        </span>
                      ))}
                    </div>
                    <div className="subsholder hide-scrollbar">
                      {subtitlesLoading ? (
                        <SwapLoader {...text} />
                      ) : (
                        <>
                          {realdata.data.subtitles.map((sub, index, text) => (
                            <Subswap
                              key={index}
                              sub={sub}
                              title={realdata.data.results[0].name}
                              year={realdata.year}
                              index={index}
                              text={text}
                            />
                          ))}
                          {!realdata?.data?.subtitles.length > 0 && (
                            <NotAvailable {...lang} />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </span>
              </div>
              <div
                className="ShowIthereInMobile hide-scrollbar"
                style={{
                  display: "none",
                }}
              >
                <div className="lang-keys hide-scrollbar">
                  {Object.entries(languages).map(([code, langu]) => (
                    <span
                      key={code}
                      className="language-details"
                      style={{
                        backgroundColor:
                          langu == lang.language ? "white" : "#f1c40f",
                        color: langu == lang.language ? "black" : "black",
                      }}
                      onClick={() => {
                        setSubsLoading(true);

                        setLang({ code: code, language: langu });
                      }}
                    >
                      {langu}
                    </span>
                  ))}
                </div>
                <div className="subsholder hide-scrollbar">
                  {subtitlesLoading ? (
                    <SwapLoader {...text} />
                  ) : (
                    <>
                      {realdata.data.subtitles.length > 0 ? (
                        realdata.data.subtitles?.map((sub, index, text) => (
                          <Subswap
                            key={index}
                            sub={sub}
                            title={realdata.data.results[0].name}
                            index={index}
                            year={realdata.year}
                            text={text}
                          />
                        ))
                      ) : (
                        <NotAvailable {...lang} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {realdata && !realdata?.data?.status && (
        <div
          className="quote-container hide-scrollbar"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="quote"
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
            }}
          >
            Sorry subtitiles not available for this movie yet!
          </div>
        </div>
      )}
    </div>
  );
}

export default Subtitles;
