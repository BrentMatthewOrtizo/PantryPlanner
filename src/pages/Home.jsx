import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Pantry Planner</h1>
        <p className="home-subtitle">Turn your pantry into possibilities</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>
    </div>
  );
};

export default Home;