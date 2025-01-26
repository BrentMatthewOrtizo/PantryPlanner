import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing all the page components
import Home from "./pages/Home"; // Home page of the application
import SignUpLogin from "./pages/SignUpLogin"; // Sign-up and login page
import FoodPreferences from "./pages/FoodPreferences"; // Cuisine selection page
import CookingGoals from "./pages/CookingGoals"; // Cooking goals selection page
import Hub from "./pages/Hub"; // Main user hub/dashboard
import RecipeView from "./pages/RecipeView"; // Recipe viewing and interaction page

// Main App Component
const App = () => {
  return (
    <Router>
      {/* Defines the routes and components to render for each path */}
      <Routes>
        {/* Home Page - Default entry point of the application */}
        <Route path="/" element={<Home />} />

        {/* Sign-Up and Login Page - Allows users to create an account or log in */}
        <Route path="/signup" element={<SignUpLogin />} />

        {/* Cuisine Selection Page - Allows users to select their preferred cuisines */}
        <Route path="/cuisine-selection" element={<FoodPreferences />} />

        {/* Cooking Goals Page - Lets users specify their cooking goals */}
        <Route path="/cooking-goals" element={<CookingGoals />} />

        {/* User Hub - The central dashboard for the user */}
        <Route path="/hub" element={<Hub />} />

        {/* Recipe View Page - Displays detailed recipes and allows interactions */}
        <Route path="/recipes" element={<RecipeView />} />
      </Routes>
    </Router>
  );
};

export default App;