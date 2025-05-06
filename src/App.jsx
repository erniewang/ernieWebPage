import React, { useState } from "react";
import "./App.css";

const pages = ["Ernie", "Projects", "Music", "Photography"];
const images = ["face.jpg", "camera.jpg", "toolbox.jpg", "radio.jpg"];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (index) => {
    if (index === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="app">
      {/* Header: Just nav boxes aligned top-left */}
      <header className="header">
        <div className="nav-boxes">
          {pages.map((title, index) => (
            <div
              key={index}
              className={`nav-box ${index === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(index)}
            >
              <img
                src={`/${images[index]}`}
                alt={title}
                className="nav-icon"
              />
            </div>
          ))}
        </div>
      </header>

      <main className={`main-content ${isTransitioning ? "fade-out" : "fade-in"}`}>
        <div className="image-box"></div>
      </main>
    </div>
  );
}
