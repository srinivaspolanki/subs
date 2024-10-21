import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";
import RecentDownloads from "./recent.js";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  const { rows: recentdownloads } = await sql`
  SELECT movie_id, movie_name, country
FROM movies
ORDER BY movie_id DESC
LIMIT 5;
`;
  console.log(recentdownloads);
  console.log(initialRandomMovie);
  return (
    <main style={{ height: "100%" }}>
      <SearchBar
        initialRandomMovie={initialRandomMovie}
        recentdownloads={recentdownloads}
      />
    </main>
  );
}
