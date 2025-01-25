import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CuisineCard from "../components/CuisineCard";
import "../components/cuisine.css";

const cuisines = [
  { name: "Asian", imageSrc: "/images/asian.jpg" },
  { name: "Italian", imageSrc: "/images/italian.jpg" },
  { name: "Mexican", imageSrc: "/images/mexican.jpg" },
  { name: "French", imageSrc: "/images/french.jpg" },
  { name: "Middle Eastern", imageSrc: "/images/middle_eastern.jpg" },
  { name: "American", imageSrc: "/images/american.jpg" },
  { name: "Mediterranean", imageSrc: "/images/mediterranean.jpg" },
  { name: "Other", imageSrc: "/images/other.jpg" },
];

function CuisineSelection() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (name) => {
    setSelectedCuisines((prev) =>
      prev.includes(name) ? prev.filter((cuisine) => cuisine !== name) : [...prev, name]
    );
  };

  const handleContinue = () => {
    console.log("Selected Cuisines:", selectedCuisines);
    navigate("/cooking-goals");
  };

  return (
    <div className="cuisine-selection-container">
      <h1 className="title">Choose Your Favorite Cuisines</h1>
      <div className="cuisine-cards-container">
        {cuisines.map((cuisine) => (
          <CuisineCard
            key={cuisine.name}
            name={cuisine.name}
            imageSrc={cuisine.imageSrc}
            onSelect={handleSelect}
            isSelected={selectedCuisines.includes(cuisine.name)}
          />
        ))}
      </div>
      {selectedCuisines.length > 0 && (
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
}

export default CuisineSelection;