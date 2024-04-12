import React, { useState } from "react";
import { Template } from "./Template";

export const Test = () => {
  const [partColors, setPartColors] = useState(Array(60).fill("white"));
  const handlePartClick = (index) => {
    const newColors = [...partColors];
    newColors[index] = "red"; // Change color to red (you can replace with any color)
    setPartColors(newColors);
  };

  // Generate 60 semi-circle parts
  const parts = Array.from({ length: 60 }, (_, index) => (
    <Template
      key={index}
      index={index}
      color={partColors[index]}
      onClick={handlePartClick}
    />
  ));
  return <div className="semi-circle">{parts}</div>;
};
