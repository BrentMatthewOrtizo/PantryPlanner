import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./recipe.css";

const RecipeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state?.recipes || []; // Get recipes from state

  if (!recipes.length) {
    return (
      <div className="recipe-view-container">
        <h2>No recipes found. Please try again.</h2>
        <button className="back-button" onClick={() => navigate("/hub")}>
          Back to Pantry
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-view-container">
      <h1 className="recipe-title">Recommended Recipes</h1>
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
            <h3>{recipe.title}</h3>
            <button
              className="back-button"
              onClick={() =>
                window.open(
                  `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`,
                  "_blank"
                )
              }
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate("/hub")}>
        Back to Pantry
      </button>
    </div>
  );
};

export default RecipeView;