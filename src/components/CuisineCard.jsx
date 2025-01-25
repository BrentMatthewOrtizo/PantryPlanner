import React from "react";

function CuisineCard({ name, imageSrc, onSelect, isSelected }) {
  return (
    <div
      className={`cuisine-card ${isSelected ? "selected" : ""}`}
      style={{
        width: "200px",
        height: "300px",
        border: isSelected ? "2px solid #28a745" : "1px solid #ccc",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => onSelect(name)}
    >
      <div
        style={{
          height: "75%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        style={{
          height: "25%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h5 style={{ margin: 0, fontSize: "1rem" }}>{name}</h5>
      </div>
    </div>
  );
}

export default CuisineCard;