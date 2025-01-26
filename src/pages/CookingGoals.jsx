import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CookingGoals.css";
import generalCooking from "../assets/general_cooking.jpg";
import budgetCooking from "../assets/budget_cooking.jpg";
import healthyCooking from "../assets/healthy_cooking.jpg";

const CookingGoals = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    {
      id: 1,
      title: "Learn to Cook Generally",
      description: "Master the Basics and Beyond in Various Cuisines",
      image: generalCooking,
    },
    {
      id: 2,
      title: "Learn to Cook on a Budget",
      description: "Create Delicious Meals While Saving Money",
      image: budgetCooking,
    },
    {
      id: 3,
      title: "Learn to Cook for Health",
      description: "Focus on Nutritious and Balanced Recipes",
      image: healthyCooking,
    },
  ];

  const handleGoalClick = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    console.log("Selected Cooking Goals:", selectedGoals);
    navigate("/hub");
  };

  return (
    <div className="cooking-goals-container">
      <h2 className="goals-header">What are your cooking goals?</h2>
      <div className="cooking-goals-grid">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-item ${selectedGoals.includes(goal.id) ? "selected" : ""}`}
            onClick={() => handleGoalClick(goal.id)}
          >
            <img src={goal.image} alt={goal.title} className="goal-image" />
            <div className="goal-text">
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedGoals.length > 0 && (
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
};

export default CookingGoals;