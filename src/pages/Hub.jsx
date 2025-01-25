import React, { useState } from "react";
import "./hub.css";

const Hub = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");

  const handleAddIngredient = () => {
    if (input.trim() && ingredients.length < 25) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="hub-container">
      <h1 className="hub-title">Welcome to Your Pantry</h1>
      <div className="hub-content">
        <div className="pantry-section">
          <h2>Your Pantry</h2>
          <div className="pantry">
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <div key={rowIndex} className="shelf">
                {ingredients
                  .slice(rowIndex * 5, rowIndex * 5 + 5)
                  .map((ingredient, i) => (
                    <div key={i} className="pantry-item">
                      {ingredient}
                      <button
                        className="remove-button"
                        onClick={() =>
                          handleRemoveIngredient(rowIndex * 5 + i)
                        }
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className="add-ingredient-bar">
            <input
              type="text"
              placeholder="Add an ingredient"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ingredient-input"
            />
            <button
              onClick={handleAddIngredient}
              className="add-button"
              disabled={ingredients.length >= 25}
            >
              +
            </button>
          </div>
        </div>
        <div className="features-section">
          <div className="feature-card">
            <h3>Find Recipes</h3>
            <p>
              Discover delicious recipes based on the ingredients in your
              pantry!
            </p>
            <button className="search-button">Search for Recipes</button>
          </div>
          <div className="feature-card">
            <h3>Your Achievements</h3>
            <p>
              Track your cooking progress and unlock new achievements!
            </p>
            <button className="achievements-button">
              View Achievements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;