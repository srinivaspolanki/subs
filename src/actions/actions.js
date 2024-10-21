"use server";

import { cache } from "react";

const TMBD_API_KEY = process.env.TMBD_API_KEY;
const SUBDL_API_KEY = process.env.SUBDL_API_KEY;

export async function fetchRandomMovie() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMBD_API_KEY}&append_to_response=images&page=2`;

  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
      {
        cache: "no-store",
      }
    );
    console.log("opafhiadfi");
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();
    const rand = Math.floor(Math.random() * 19) + 1;
    console.log(rand);
    return {
      poster: movieData.results[rand]?.backdrop_path,
      title: movieData.results[rand]?.title,
      year: movieData.results[rand].release_date,
    };
  } catch (error) {
    console.error("Error fetching random movie:", error);
    return null;
  }
}

export async function searchMovies(query) {
  console.log("hello");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMBD_API_KEY}&query=${query}&page=1`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
}

const findSubs = async (movieId, lang) => {
  const url = `https://api.subdl.com/api/v1/subtitles?api_key=${SUBDL_API_KEY}&type=movie&tmdb_id=${movieId}&subs_per_page=30&languages=${lang.code}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
};

export { findSubs };
