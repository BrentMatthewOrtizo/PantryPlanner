import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../components/GoalCard";
import "../components/goal.css";

const goals = [
  {
    goal: "Learn to cook generally",
    description: "Master the basics and beyond in various cuisines.",
    imageSrc: "/images/general_cooking.jpg",
  },
  {
    goal: "Learn to cook on a budget",
    description: "Create delicious meals while saving money.",
    imageSrc: "/images/budget_cooking.jpg",
  },
  {
    goal: "Learn to cook for health",
    description: "Focus on nutritious and balanced recipes.",
    imageSrc: "/images/healthy_cooking.jpg",
  },
];

function CookingGoals() {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleContinue = () => {
    console.log("Selected Goals:", selectedGoals);
    navigate("/hub");
  };

  return (
    <div className="cooking-goals-container">
      <h1 className="goals-title">What are your cooking goals?</h1>
      <div className="goals-container">
        {goals.map((goalItem) => (
          <GoalCard
            key={goalItem.goal}
            goal={goalItem.goal}
            description={goalItem.description}
            imageSrc={goalItem.imageSrc}
            onSelect={handleSelect}
            isSelected={selectedGoals.includes(goalItem.goal)}
          />
        ))}
      </div>
      {selectedGoals.length > 0 && (
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
}

export default CookingGoals;