import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./recipe.css";

const RecipeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state?.recipes || []; // Get recipes from state

  const [selectedRecipe, setSelectedRecipe] = useState(null); // State for popup
  const [recipeDetails, setRecipeDetails] = useState(null); // Recipe details
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const recipesPerPage = 5;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const fetchRecipeDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      setRecipeDetails(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleViewRecipe = async (recipe) => {
    setSelectedRecipe(recipe);
    await fetchRecipeDetails(recipe.id); // Fetch details when View Recipe is clicked
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
    setRecipeDetails(null); // Reset details
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate recipes for the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

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
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
            <h3>{recipe.title}</h3>
            <button
              className="view-recipe-button"
              onClick={() => handleViewRecipe(recipe)}
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <button className="back-button" onClick={() => navigate("/hub")}>
        Back to Pantry
      </button>

      {/* Recipe Popup */}
      {selectedRecipe && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup-button" onClick={handleClosePopup}>
              &times;
            </button>
            {loadingDetails ? (
              <p>Loading...</p>
            ) : recipeDetails ? (
              <>
                <div className="popup-header">
                  <img
                    src={recipeDetails.image}
                    alt={recipeDetails.title}
                    className="popup-recipe-image"
                  />
                  <h2>{recipeDetails.title}</h2>
                </div>
                <div className="popup-body">
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipeDetails.extendedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.original}</li>
                    ))}
                  </ul>
                  <h3>Summary:</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipeDetails.summary,
                    }}
                  ></p>
                  <h3>Instructions:</h3>
                  <p>{recipeDetails.instructions || "No instructions provided."}</p>
                </div>
              </>
            ) : (
              <p>Failed to load recipe details. Please try again later.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeView;