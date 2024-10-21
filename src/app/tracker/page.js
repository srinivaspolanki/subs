import React from "react";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";

const MovieTable = async () => {
  const { rows } = await sql`SELECT * FROM movies`;
  console.log(rows);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        background: "black",
        padding: "10px",
      }}
    >
      <table
        style={{
          background: "white",
          borderRadius: "3px",
          width: "auto",
          borderCollapse: "collapse",
          border: "2px solid white",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f4f4f4",
              color: "black",
            }}
          >
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              id
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              Movie
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.movie_id}
              style={{
                background: "white",
                color: "black",
              }}
            >
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.movie_id}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.movie_name}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.country} , {row.reference} , {row.adress}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
