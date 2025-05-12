import React, { useState, useEffect } from "react";
import "./App.css";
import Ernie from "./pages/ernie";
import Projects from "./pages/projects";
import Music from "./pages/music";
import Photography from "./pages/photos";
import { substituteChars } from "./componets/helperFunctions";

const pages = ["Ernie",  "Photography", "Projects", "Music"];
const images = ["face.jpg", "camera.jpg", "toolbox.jpg", "radio.jpg"];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  async function handlePageChange(index) {
    const audio = await new Audio(`sounds/${index}.mp3`);
    audio.play();
    if (index === currentPage) return;
    setCurrentPage(index);
  }

  useEffect(() => {
    substituteChars();
  }, [currentPage]);

  

  return (
    <div className="app">
      <header className="header">
        <div id="optionalName"><h1>Еrпіе Wапg ┊ 王富陽  </h1></div>
        <div className="nav-boxes">
          {pages.map((title, index) => (
            <div
              key={index}
              className={`nav-box ${index === currentPage ? "active" : ""}`}
              onClick={() => {
                handlePageChange(index);
              }}

            >
              <img
                src={`icons/${images[index]}`}
                alt={title}
                className="nav-icon"
              />
            </div>
          ))}
        </div>
      </header>
      <main className="main-content">
        <div className="image-box">
          {currentPage === 0 && <Ernie />}
          {currentPage === 2 && <Projects />}
          {currentPage === 3 && <Music />}
          {currentPage === 1 && <Photography />}
        </div>
      </main>
    </div>
  );
}
