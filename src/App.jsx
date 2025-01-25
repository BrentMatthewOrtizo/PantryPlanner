import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpLogin from "./pages/SignUpLogin"; // Updated import for SignUpLogin
import NextPage from "./pages/NextPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpLogin />} /> {/* Updated route */}
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </Router>
  );
};

export default App;