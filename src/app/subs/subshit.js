import React from "react";
import { IoArrowDown } from "react-icons/io5";
import "../index.css";
import "./page.css";
import jszip from "jszip";
import toast, { Toaster } from "react-hot-toast";

export default function Subswap({ index, sub, title, year }) {
  function downloadSrtFromZip(url, title) {
    // Create a toast ID to manage the loading state
    const toastId = toast.loading("Downloading", {
      style: {
        backgroundColor: "#f1c40f",
        color: "black",
      },
    });

    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return jszip.loadAsync(blob);
      })
      .then((zip) => {
        const srtFile = zip.file(/\.srt$/i);
        if (srtFile) {
          const srtContent = srtFile[0].async("text");
          srtContent.then((content) => {
            const filename = srtFile[0].name;
            const srtBlob = new Blob([content], {
              type: "text/plain;charset=utf-8",
            });

            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(srtBlob);
            downloadLink.download = filename;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();

            document.body.removeChild(downloadLink);

            // Dismiss the loading toast and show success
            toast.dismiss(toastId);
            toast.success("Downloaded!", {
              style: {
                backgroundColor: "#f1c40f",
                color: "black",
              },
            });

            // Make the API call after successful download
            const response = fetch(`/api/tracker`, {
              method: "POST", // Using POST to send data
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                moviename: title,
                year: year,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                const id = data.id;
                const userResponse = prompt("how do u know about this site?");
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
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            localStorage.setItem("id", response.id);
          });
        } else {
          // Dismiss the loading toast and show error
          toast.dismiss(toastId);
          toast.error("No SRT file found in the zip", {
            style: {
              backgroundColor: "#f1c40f",
              color: "black",
            },
          });
        }
      })
      .catch((error) => {
        // Dismiss the loading toast and show error
        toast.dismiss(toastId);
        toast.error("Oh shit! try another subtitle file.", {
          style: {
            backgroundColor: "#f1c40f",
            color: "black",
          },
        });
      });
  }

  return (
    <div className="hide-scrollbar">
      <button
        onClick={() =>
          downloadSrtFromZip(`https://dl.subdl.com${sub.url}`, title)
        }
        className="subs"
        key={index}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <IoArrowDown
            style={{
              marginRight: "4px",
            }}
          />
          <span>{sub.release_name}</span>
        </div>
      </button>
    </div>
  );
}
