import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodPreferences.css";

// Imported images from the assets directory
import asian from "../assets/asian.jpg";
import italian from "../assets/italian.jpg";
import mexican from "../assets/mexican.jpg";
import french from "../assets/french.jpg";
import middleEastern from "../assets/middle_eastern.jpg";
import american from "../assets/american.jpg";
import african from "../assets/african.jpg";
import latinAmerican from "../assets/latin_american.jpg";
import mediterranean from "../assets/mediterranean.jpg";
import other from "../assets/other.jpg";

const FoodPreferences = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // Cuisine data
  const cuisines = [
    { id: 1, name: "Asian", image: asian },
    { id: 2, name: "Italian", image: italian },
    { id: 3, name: "Mexican", image: mexican },
    { id: 4, name: "French", image: french },
    { id: 5, name: "Middle Eastern", image: middleEastern },
    { id: 6, name: "American", image: american },
    { id: 7, name: "African", image: african },
    { id: 8, name: "Latin American", image: latinAmerican },
    { id: 9, name: "Mediterranean", image: mediterranean },
    { id: 10, name: "Other", image: other },
  ];


  const toggleSelection = (cuisine) => {
    setSelected((prev) =>
      prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine)
        : [...prev, cuisine]
    );
  };


  const handleSubmit = () => {
    console.log("Selected Cuisines:", selected); 
    navigate("/cooking-goals");
  };

  return (
    <div className="preferences-container">
      <h2>Select Your Preferred Cuisines</h2>
      <div className="preferences-grid">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.id}
            className={`grid-item ${
              selected.includes(cuisine.name) ? "selected" : ""
            }`}
            onClick={() => toggleSelection(cuisine.name)}
          >
            <img src={cuisine.image} alt={cuisine.name} />
            <div className="text-overlay">
              <p>{cuisine.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

export default FoodPreferences;