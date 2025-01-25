import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpLogin from "./pages/SignUpLogin";
import CuisineSelection from "./pages/CuisineSelection";
import CookingGoals from "./pages/CookingGoals";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpLogin />} />
        <Route
          path="/cuisine-selection"
          element={<CuisineSelection onContinue={() => (window.location.href = "/cooking-goals")} />}
        />
        <Route path="/cooking-goals" element={<CookingGoals />} />
      </Routes>
    </Router>
  );
};

export default App;