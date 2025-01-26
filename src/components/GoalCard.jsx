import React from "react";

function GoalCard({ goal, description, imageSrc, onSelect, isSelected }) {
  return (
    <div
      className={`goal-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(goal)}
      style={{
        width: "300px",
        height: "180px",
        border: isSelected ? "2px solid #28a745" : "1px solid #ccc",
        cursor: "pointer",
        borderRadius: "10px",
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "center",
        padding: "1rem",
        color: "white",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
    >
      <h5 style={{ margin: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
        {goal}
      </h5>
      <p style={{ fontSize: "1rem", color: "#eee" }}>{description}</p>
    </div>
  );
}

export default GoalCard;