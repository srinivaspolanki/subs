// src/app/api/tracker/route.ts
import { sql } from "@vercel/postgres";
import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Console } from "console";

export async function POST(request) {
  try {
    const body = await request.json();
    const { moviename, year, response = null, id = null } = body;
    console.log("ID value:", id);
    console.log("Response value:", response);

    if (!moviename) {
      return NextResponse.json(
        { error: "Movie named is required." },
        { status: 400 }
      );
    }

    // Get the IP address from headers
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
    console.log("hekld");
    // Get country from IP
    const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    console.log(geoResponse);
    const country = geoResponse.data.country_name || "Unknown";
    const adress =
      ip +
      (geoResponse.data.city || "Unknown") +
      ", " +
      (geoResponse.data.org || "Unknown") +
      ", " +
      (geoResponse.data.region || "Unknown");

    const movie = moviename + ", " + year;
    // Insert into database
    let data;
    if (!response) {
      data = await sql`
            INSERT INTO movies (movie_name, country , adress ) 
            VALUES (${movie}, ${country} , ${adress}) returning *
        `;
      return NextResponse.json(
        { message: "Movie added successfully!", id: data.rows[0].movie_id },
        { status: 201 }
      );
    } else {
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        return NextResponse.json(
          { message: "Invalid movie ID provided." },
          { status: 400 }
        );
      }

      data = await sql`
            update movies set reference=${response} where movie_id=${id}
            
        `;
      return NextResponse.json(
        { message: "Movie upldated successfully!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error getting user location or inserting data:", error);
    return NextResponse.json(
      {
        error: "An error occurred while saving the movie data.",
      },
      { status: 500 }
    );
  }
}
