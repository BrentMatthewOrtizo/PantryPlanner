import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./recipe.css";
import "./chat.css"; 
import { sendMessageToGroq } from "../services/groq";

const RecipeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state?.recipes || []; 

  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const [recipeDetails, setRecipeDetails] = useState(null); 
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); 
  const recipesPerPage = 5;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingGroq, setLoadingGroq] = useState(false);

  
  const [showTextBubble, setShowTextBubble] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setShowTextBubble(false), 3000);
    return () => clearTimeout(timer); 
  }, []);

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
    await fetchRecipeDetails(recipe.id); 
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
    setRecipeDetails(null); 
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    setLoadingGroq(true);
    try {
      const groqResponse = await sendMessageToGroq([...chatMessages, userMessage]);
      const assistantMessage = { role: "assistant", content: groqResponse };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to fetch Groq response:", error);
    } finally {
      setLoadingGroq(false);
      setChatInput(""); 
    }
  };

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

      {/* Chatbox */}
      <button className="chat-button" onClick={toggleChatbox}>
        Ask Groq
      </button>
      {showTextBubble && <div className="text-bubble">Ask Groq for cooking advice!</div>}
      {isChatOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <h3>Chat with Groq for advice!</h3>
            <button onClick={toggleChatbox} aria-label="Close Chat">
              &times;
            </button>
          </div>
          <div className="chat-body">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                {msg.content}
              </div>
            ))}
            {loadingGroq && <div className="chat-message assistant">Loading...</div>}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={handleChatSubmit}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeView;