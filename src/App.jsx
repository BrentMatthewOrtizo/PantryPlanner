import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpLogin from "./pages/SignUpLogin";
import CuisineSelection from "./pages/CuisineSelection";
import CookingGoals from "./pages/CookingGoals";
import Hub from "./pages/Hub"; // Import Hub

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpLogin />} />
        <Route path="/cuisine-selection" element={<CuisineSelection />} />
        <Route path="/cooking-goals" element={<CookingGoals />} />
        <Route path="/hub" element={<Hub />} /> {/* Add Hub route */}
      </Routes>
    </Router>
  );
};

export default App;