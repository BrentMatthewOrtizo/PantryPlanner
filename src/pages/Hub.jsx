import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getRecipesByIngredients } from "../services/spoonacular";
import "./hub.css";

const Hub = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleAddIngredient = () => {
    if (input.trim() && ingredients.length < 25) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleFindRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const recipes = await getRecipesByIngredients(ingredients);
      navigate("/recipes", { state: { recipes } }); // Pass recipes to RecipeView.jsx
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hub-container">
      <h1 className="hub-title">Welcome to Your Pantry</h1>
      <div className="hub-content">
        {/* Pantry Section */}
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

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <h3>Find Recipes</h3>
            <p>
              Discover delicious recipes based on the ingredients in your
              pantry!
            </p>
            <button
              className="search-button"
              onClick={handleFindRecipes}
              disabled={loading || ingredients.length === 0}
            >
              {loading ? "Searching..." : "Search for Recipes"}
            </button>
          </div>
          <div className="feature-card">
            <h3>Your Achievements</h3>
            <p>
              Track your cooking progress and unlock new achievements!
            </p>
            <button className="achievements-button">View Achievements</button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Hub;