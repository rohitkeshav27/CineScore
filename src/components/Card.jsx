import React from "react";

const Card = ({ name, rating, image }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <img
        src={image}
        alt="Card image"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          marginRight: "1rem",
        }}
      />
      <div
        style={{
          flex: 1,
          fontWeight: "bold",
          fontSize: "1.3rem",
          color: "#5B2C6F",
        }}
      >
        {name}
      </div>
      <div style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>
        {rating}
      </div>
    </div>
  );
};

export default Card;
